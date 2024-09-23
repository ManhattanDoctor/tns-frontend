import { Logger, ITransportCommand, ISignature, LoggerWrapper } from '@ts-core/common';
import { TransportCryptoManagerMetamaskFrontend, Metamask } from '@ts-core/crypto-metamask-frontend';
import { NativeWindowService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { WindowService } from '@ts-core/angular';

@Injectable({ providedIn: 'root' })
export class WalletService extends LoggerWrapper {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _wallet: any;
    private isHasPermissions: boolean;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, nativeWindow: NativeWindowService, private windows: WindowService) {
        super(logger);
        this._wallet = nativeWindow.window['ethereum'];
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    protected async requestPermissionsIfNeed(): Promise<void> {
        if (this.isHasPermissions) {
            return;
        }
        try {
            await this.wallet.request({ method: 'wallet_requestPermissions', params: [{ "eth_accounts": {} }] });
            this.isHasPermissions = true;
        }
        catch (error: any) {
            this.isHasPermissions = false;
            this.windows.info(error.message);
        }
    }

    public async sign(message: string, nonce: string, account: string): Promise<ISignature> {
        return { value: await Metamask.sign(message, account, this.wallet), publicKey: account, algorithm: TransportCryptoManagerMetamaskFrontend.ALGORITHM, nonce };
    }

    public async signCommand<U>(command: ITransportCommand<U>, account: string): Promise<ISignature> {
        let nonce = Date.now().toString();
        let request = !_.isNil(command.request) ? command.request.toString() : '';
        let message = `${command.name}${request}${nonce}`;
        return this.sign(message, nonce, account);
    }

    public async getAccounts(): Promise<Array<string>> {
        await this.requestPermissionsIfNeed();
        return this.wallet.request({ method: 'eth_requestAccounts' });
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get wallet(): any {
        return this._wallet;
    }
}
