import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { User } from '@common/platform';
import { UserMenu } from '../../service';
import { LanguageService } from '@ts-core/frontend';
import { Transport } from '@ts-core/common';
import { MenuTriggerForDirective } from '@ts-core/angular-material';
import { HlfObjectContainerBaseComponent } from '@feature/hlf/component';
import * as _ from 'lodash';

@Component({
    selector: 'user-container',
    templateUrl: 'user-container.component.html'
})
export class UserContainerComponent extends HlfObjectContainerBaseComponent<User> {

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
        public menu: UserMenu,
    ) {
        super(container, transport);

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('user.user', 0, 'USER'));
        this.tabs.add(new SelectListItem('coin.balances', 1, 'COIN_BALANCES'));
        this.tabs.add(new SelectListItem('hlf.action.actions', 2, 'HLF_ACTIONS'));
        this.tabs.add(new SelectListItem('hlf.action.finances', 3, 'HLF_FINANCE_ACTIONS'));
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
