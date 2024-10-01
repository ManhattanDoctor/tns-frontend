import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { AuctionSecondaryAddCommand, IAuctionSecondaryAddDto } from '../AuctionSecondaryAddCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { ApiService } from '@core/service';
import { AuctionSecondaryAddComponent } from '../../component';
import { AuctionSecondaryAddCommand as HlfAuctionSecondaryAddCommand } from '@common/hlf/auction/transport';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuctionSecondaryAddHandler extends TransportCommandHandler<IAuctionSecondaryAddDto, AuctionSecondaryAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private windows: WindowService, private api: ApiService) {
        super(logger, transport, AuctionSecondaryAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IAuctionSecondaryAddDto): Promise<void> {
        let windowId = 'AuctionSecondaryAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(AuctionSecondaryAddComponent, config) as AuctionSecondaryAddComponent;
        if (!_.isNil(params)) {
            content.price = params.price;
        }
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case AuctionSecondaryAddComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.hlf.ledgerRequestSendListen(new HlfAuctionSecondaryAddCommand(content.serialize()));
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
