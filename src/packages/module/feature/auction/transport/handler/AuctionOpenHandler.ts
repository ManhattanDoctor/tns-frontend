import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { Transport, Logger } from '@ts-core/common';
import { AuctionOpenCommand } from '../AuctionOpenCommand';
import { HlfObjectDetailsService, RouterService } from '@core/service';
import { AuctionContainerComponent } from '../../component';
import { ComponentType } from '@angular/cdk/portal';
import { HlfObjectBaseOpenHandler } from '@feature/hlf/transport/handler';
import { Auction } from '@common/platform';
import { HlfObjectId } from '@core/lib';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuctionOpenHandler extends HlfObjectBaseOpenHandler<Auction> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private hlfObject: HlfObjectDetailsService) {
        super(logger, transport, AuctionOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getComponent(): ComponentType<any> {
        return AuctionContainerComponent;
    }

    protected async getItem(id: HlfObjectId): Promise<Auction> {
        if (_.isString(id)) {
            id = await this.hlfObject.id(id);
        }
        return this.api.auctionGet(id);
    }

    protected getUrl(id: HlfObjectId): string {
        return `${RouterService.AUCTION_URL}/${id}`;
    }
}
