import { Injectable } from '@angular/core';
import { IUIDable, IKeyAsymmetric, LoggerWrapper, Logger, MapCollection, ValidateUtil, TransformUtil } from '@ts-core/common';
import { CookieService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable()
export class SignerService extends LoggerWrapper {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    private static COOKIE_KEY = 'tns-explorer:signers';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public signer: ISigner;
    public signers: MapCollection<ISigner>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private cookie: CookieService) {
        super(logger);
        this.signers = new MapCollection('uid');
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

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

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
}

export interface ISigner extends IUIDable {
    key: IKeyAsymmetric;
    name: string;
}