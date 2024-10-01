import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { AuctionPrimaryAddCommand, IAuctionPrimaryAddDto } from '../AuctionPrimaryAddCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { ApiService } from '@core/service';
import { AuctionPrimaryAddComponent } from '../../component';
import { AuctionPrimaryAddCommand as HlfAuctionPrimaryAddCommand } from '@common/hlf/auction/transport';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuctionPrimaryAddHandler extends TransportCommandHandler<IAuctionPrimaryAddDto, AuctionPrimaryAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private windows: WindowService, private api: ApiService) {
        super(logger, transport, AuctionPrimaryAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IAuctionPrimaryAddDto): Promise<void> {
        let windowId = 'AuctionPrimaryAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(AuctionPrimaryAddComponent, config) as AuctionPrimaryAddComponent;
        if (!_.isNil(params)) {
            content.nickname = params.nickname;
        }
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case AuctionPrimaryAddComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.hlf.ledgerRequestSendListen(new HlfAuctionPrimaryAddCommand(content.serialize()));
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
