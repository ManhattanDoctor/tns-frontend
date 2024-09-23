import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { CoinMenu } from '@feature/coin/service';
import { LanguageService } from '@ts-core/frontend';
import { Coin } from '@common/platform';
import { Transport } from '@ts-core/common';
import { MenuTriggerForDirective } from '@ts-core/angular-material';
import { HlfObjectContainerBaseComponent } from '@feature/hlf/component';
import * as _ from 'lodash';

@Component({
    selector: 'coin-container',
    templateUrl: 'coin-container.component.html'
})
export class CoinContainerComponent extends HlfObjectContainerBaseComponent<Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    public tabs: SelectListItems<ISelectListItem<string>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        transport: Transport,
        language: LanguageService,
        public menu: CoinMenu,
    ) {
        super(container, transport);

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('coin.coin', 0, 'COIN'));
        this.tabs.add(new SelectListItem('coin.balances', 1, 'BALANCES'));
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
