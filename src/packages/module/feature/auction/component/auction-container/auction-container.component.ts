import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { Auction, getAuctionRoom } from '@common/platform';
import { AuctionMenu } from '../../service';
import { LanguageService } from '@ts-core/frontend';
import { ObjectUtil, Transport } from '@ts-core/common';
import { MenuTriggerForDirective } from '@ts-core/angular-material';
import { HlfObjectContainerBaseComponent } from '@feature/hlf/component';
import { AuctionChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import { TransportSocket } from '@ts-core/socket-client';
import * as _ from 'lodash';

@Component({
    selector: 'auction-container',
    templateUrl: 'auction-container.component.html'
})
export class AuctionContainerComponent extends HlfObjectContainerBaseComponent<Auction> {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    public tabs: SelectListItems<ISelectListItem<string>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        transport: Transport,
        language: LanguageService,
        private socket: TransportSocket,
        public menu: AuctionMenu,
    ) {
        super(container, transport);

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('auction.auction', 0, 'AUCTION'));
        this.tabs.add(new SelectListItem('hlf.action.actions', 1, 'HLF_ACTIONS'));
        this.tabs.complete(0);

        socket.getDispatcher<AuctionChangedEvent>(AuctionChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => item.uid === this.uid),
                takeUntil(this.destroyed)
            ).subscribe(data => ObjectUtil.copyPartial(data, this.item));
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected itemOpenedHandler(item: Auction): void {
        this.socket.roomAdd(getAuctionRoom(item.id));
    }

    protected itemClosedHandler(item: Auction): void {
        this.socket.roomRemove(getAuctionRoom(item.id));
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.item);
        this.trigger.openMenuOn(event.target);
    }
}
