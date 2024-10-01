import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common';
import { ApiService } from '@core/service';
import { AuctionCheckCommand } from '@common/hlf/auction/transport';
import { AuctionStatus } from '@common/platform';
import * as _ from 'lodash';
import { AuctionBidCommand } from '../transport';

@Injectable({ providedIn: 'root' })
export class AuctionMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static CHECK = 0;
    private static BID = 1;

    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, api: ApiService) {
        super(language);

        let item: IListItem<void> = null;

        item = new ListItem('auction.check.check', AuctionMenu.CHECK, null, 'fas fa-check me-2');
        item.action = (item, auction) => api.hlf.ledgerRequestSend(new AuctionCheckCommand({ uid: auction.uid }));
        item.checkEnabled = (item, auction) => auction.status === AuctionStatus.IN_PROGRESS;
        this.add(item)

        item = new ListItem('auction.bid.bid', AuctionMenu.BID, null, 'fas fa-gavel me-2');
        item.action = (item, auction) => transport.send(new AuctionBidCommand({ auctionUid: auction.uid }));
        item.checkEnabled = (item, auction) => auction.status === AuctionStatus.IN_PROGRESS;
        this.add(item);

        this.complete();
    }
}
