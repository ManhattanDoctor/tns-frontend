import { Injectable } from '@angular/core';
import { IUIDable, LoggerWrapper, Logger, MapCollection, TransformUtil, ISignature as ICommonSignature, ITransportCommand, TransportCryptoManager, ITransportCryptoManager } from '@ts-core/common';
import { CookieService } from '@ts-core/angular';
import { User } from '@common/hlf/acl';
import { NON_SIGNED_COMMANDS as ACL_NON_SIGNED_COMMANDS } from '@common/hlf/acl/transport';
import { NON_SIGNED_COMMANDS as AUCTION_NON_SIGNED_COMMANDS } from '@common/hlf/auction/transport';
import { TransportCryptoManagerMetamaskFrontend } from '@ts-core/crypto-metamask-frontend';
import { WalletService } from './WalletService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SignerService extends LoggerWrapper {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    private static COOKIE_KEY = 'tns-explorer:signers';
    private static NON_SIGNED_COMMANDS: Array<string> = _.concat(ACL_NON_SIGNED_COMMANDS, AUCTION_NON_SIGNED_COMMANDS);

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _signer: ISigner;
    private _userId: string;
    private _signers: MapCollection<ISigner>;
    private _isCanSign: boolean;
    private _manager: ITransportCryptoManager;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, wallet: WalletService, private cookie: CookieService) {
        super(logger);
        this._manager = new TransportCryptoManagerMetamaskFrontend(wallet.wallet);
        this._signers = new MapCollection('uid');

        this.loadAll();
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private async saveAll(): Promise<void> {
        this.cookie.put(SignerService.COOKIE_KEY, TransformUtil.fromJSON({ signers: this.signers.collection }));
    }

    private async loadAll(): Promise<void> {
        let item = TransformUtil.toJSON(this.cookie.get(SignerService.COOKIE_KEY));
        if (_.isNil(item)) {
            return;
        }
        for (let profile of item.signers) {
            this.signers.add(profile);
        }
        this.checkProfile();
    }

    private checkProfile(): void {
        if (!_.isNil(this.signer) && !this.signers.has(this.signer.uid)) {
            this.signer = null;
        }
        if (_.isNil(this.signer) && this.signers.length > 0) {
            this.signer = this.signers.getFirst();
        }
    }

    private commitSignerProperties(): void {
        this._userId = !_.isNil(this.signer) ? User.createUid(this.signer.uid) : null;
        this._isCanSign = !_.isNil(this.signer);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public isNeedSign<U>(item: string | ITransportCommand<U>): boolean {
        if (_.isObject(item)) {
            item = item.name;
        }
        return this.isCanSign && !SignerService.NON_SIGNED_COMMANDS.includes(item);
    }

    public async sign<U>(item: ITransportCommand<U>): Promise<ISignature> {
        if (!this.isNeedSign(item)) {
            return null;
        }
        return { userId: this.userId, signature: await TransportCryptoManager.sign(item, this.manager, { privateKey: this.signer.uid, publicKey: this.signer.uid }) }
    }

    public async add(item: ISigner): Promise<void> {
        item = this.signers.add(item);
        if (_.isNil(item)) {
            return;
        }
        await this.saveAll();
        this.checkProfile();
    }

    public async save(item: ISigner): Promise<void> {
        await this.saveAll();
    }

    public async remove(item: ISigner): Promise<void> {
        item = this.signers.remove(item.uid);
        if (_.isNil(item)) {
            return;
        }
        await this.saveAll();
        this.checkProfile();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get userId(): string {
        return this._userId;
    }

    public get manager(): ITransportCryptoManager {
        return this._manager;
    }

    public get isCanSign(): boolean {
        return this._isCanSign;
    }

    public get signers(): MapCollection<ISigner> {
        return this._signers;
    }

    public get signer(): ISigner {
        return this._signer;
    }
    public set signer(value: ISigner) {
        if (value === this._signer) {
            return;
        }
        this._signer = value;
        this.commitSignerProperties();
    }
}

export interface ISignature {
    userId: string;
    signature: ICommonSignature;
}

export interface ISigner extends IUIDable {
    name: string;
}