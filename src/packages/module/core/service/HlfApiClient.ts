import { Logger, ITransportCryptoManager, TransportCryptoManager, ITransportCommand, TransportCommand, ITransportCommandOptions, TransportCommandAsync } from '@ts-core/common';
import { ILedgerRequestRequest, LedgerApiClient } from '@hlf-explorer/common';
import { SignerService } from '@feature/singer/service';
import * as _ from 'lodash';

export class HlfApiClient extends LedgerApiClient {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private signer: SignerService) {
        super(logger);
        this.settings.isHandleError = this.settings.isHandleLoading = true;
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

        let manager: ITransportCryptoManager = null;

        item.options['userId'] = signer.uid;
        item.options['signature'] = await TransportCryptoManager.sign(command, manager, signer.key);
        return item;
    }
}
