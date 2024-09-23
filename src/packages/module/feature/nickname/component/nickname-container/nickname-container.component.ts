import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { Nickname } from '@common/platform';
import { NicknameMenu } from '../../service';
import { LanguageService } from '@ts-core/frontend';
import { Transport } from '@ts-core/common';
import { MenuTriggerForDirective } from '@ts-core/angular-material';
import { HlfObjectContainerBaseComponent } from '@feature/hlf/component';
import * as _ from 'lodash';

@Component({
    selector: 'nickname-container',
    templateUrl: 'nickname-container.component.html'
})
export class NicknameContainerComponent extends HlfObjectContainerBaseComponent<Nickname> {

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
        public menu: NicknameMenu,
    ) {
        super(container, transport);

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('nickname.nickname', 0, 'NICKNAME'));
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
