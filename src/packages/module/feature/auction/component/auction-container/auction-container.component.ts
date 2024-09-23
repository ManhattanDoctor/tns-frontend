import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { Auction } from '@common/platform';
import { AuctionMenu } from '../../service';
import { LanguageService } from '@ts-core/frontend';
import { Transport } from '@ts-core/common';
import { MenuTriggerForDirective } from '@ts-core/angular-material';
import { HlfObjectContainerBaseComponent } from '@feature/hlf/component';
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
        public menu: AuctionMenu,
    ) {
        super(container, transport);

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('auction.auction', 0, 'AUCTION'));
        this.tabs.add(new SelectListItem('hlf.action.actions', 1, 'HLF_ACTIONS'));
        this.tabs.complete(0);
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
