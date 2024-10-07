import { Logger, ITransportCommand, ITransportCommandOptions, DateUtil } from '@ts-core/common';
import { ILedgerRequestRequest, LedgerApiClient } from '@hlf-explorer/common';
import { SignerService } from '@core/service';
import * as _ from 'lodash';

export class HlfApiClient extends LedgerApiClient {

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private signer: SignerService) {
        super(logger);
        this.settings.timeout = DateUtil.MILLISECONDS_MINUTE;
        this.settings.isHandleError = this.settings.isHandleLoading = true;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected async createRequest<U>(command: ITransportCommand<U>, options?: ITransportCommandOptions, ledgerName?: string): Promise<ILedgerRequestRequest> {
        let item = await super.createRequest<U>(command, options, ledgerName);
        if (this.signer.isNeedSign(command)) {
            let { userId, signature } = await this.signer.sign(command);
            item.options['userId'] = userId;
            item.options['signature'] = signature;
        }
        return item;
    }
}
