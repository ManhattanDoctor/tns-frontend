import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { AuctionBidCommand, IAuctionBidDto } from '../AuctionBidCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { ApiService } from '@core/service';
import { AuctionBidComponent } from '../../component';
import { AuctionBidCommand as HlfAuctionBidCommand } from '@common/hlf/auction/transport';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuctionBidHandler extends TransportCommandHandler<IAuctionBidDto, AuctionBidCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private windows: WindowService, private api: ApiService) {
        super(logger, transport, AuctionBidCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IAuctionBidDto): Promise<void> {
        let windowId = 'AuctionBid';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(AuctionBidComponent, config) as AuctionBidComponent;
        if (!_.isNil(params)) {
            content.auctionUid = params.auctionUid;
        }
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case AuctionBidComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.hlf.ledgerRequestSendListen(new HlfAuctionBidCommand(content.serialize()));
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
