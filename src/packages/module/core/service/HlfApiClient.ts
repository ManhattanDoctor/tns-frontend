import { Logger, TransportCryptoManager, ITransportCommand, TransportCommand, ITransportCommandOptions, TransportCommandAsync, ISignature } from '@ts-core/common';
import { ILedgerRequestRequest, LedgerApiClient } from '@hlf-explorer/common';
import { SignerService } from '@core/service';
import { Metamask, TransportCryptoManagerMetamaskFrontend } from '@ts-core/crypto-metamask-frontend';
import * as _ from 'lodash';
import { NativeWindowService } from '@ts-core/frontend';
import { User } from '../../../../externals/common/hlf/acl';
import { WalletService } from './WalletService';

export class HlfApiClient extends LedgerApiClient {

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private manager: TransportCryptoManagerMetamaskFrontend;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, wallet: WalletService, private signer: SignerService) {
        super(logger);
        this.settings.isHandleError = this.settings.isHandleLoading = true;
        this.manager = new TransportCryptoManagerMetamaskFrontend(wallet.wallet);
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected async createRequest<U>(command: ITransportCommand<U>, options?: ITransportCommandOptions, ledgerName?: string): Promise<ILedgerRequestRequest> {
        let item = await super.createRequest<U>(command, options, ledgerName);
        let signer = this.signer.signer;
        if (_.isNil(signer)) {
            return item;
        }

        let signature = await TransportCryptoManager.sign(command, this.manager, { privateKey: signer.uid, publicKey: signer.uid });
        item.options['userId'] = User.createUid(signer.uid);
        item.options['signature'] = signature;
        return item;
    }
}
