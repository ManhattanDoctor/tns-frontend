import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { CoinTransferCommand, ICoinTransferDto } from '../CoinTransferCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { ApiService } from '@core/service';
import { CoinTransferComponent } from '../../component';
import { CoinTransferCommand as HlfCoinTransferCommand } from '@common/hlf/auction/transport';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinTransferHandler extends TransportCommandHandler<ICoinTransferDto, CoinTransferCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private windows: WindowService, private api: ApiService) {
        super(logger, transport, CoinTransferCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: ICoinTransferDto): Promise<void> {
        let windowId = 'CoinTransfer';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(CoinTransferComponent, config) as CoinTransferComponent;
        if (!_.isNil(params.to)) {
            content.to = params.to;
        }
        if (!_.isNil(params.amount)) {
            content.amount = params.amount;
        }
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CoinTransferComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.hlf.ledgerRequestSendListen(new HlfCoinTransferCommand(content.serialize()));
                        content.close();
                    } catch (error: any) {
                        this.windows.info(ExtendedError.create(error).message);
                    } finally {
                        content.isDisabled = false;
                    }
                    break;
            }
        });
    }
}
