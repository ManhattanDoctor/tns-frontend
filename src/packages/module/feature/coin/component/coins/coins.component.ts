import { Component, ElementRef, ViewChild } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, ICdkTableSettings, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport } from '@ts-core/common';
import { PipeService } from '@core/service';
import { CoinMapCollection, CoinTableSettings } from '@core/lib';
import { Coin } from '@common/platform';
import { ViewUtil } from '@ts-core/angular';
import { CoinMenu } from '../../service';
import { CoinOpenCommand } from '../../transport';
import * as _ from 'lodash';

@Component({
    selector: 'coins',
    templateUrl: 'coins.component.html',
})
export class CoinsComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: ICdkTableSettings<Coin>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        element: ElementRef,
        pipe: PipeService,
        private transport: Transport,
        public menu: CoinMenu,
        public items: CoinMapCollection
    ) {
        super();
        ViewUtil.addClasses(element, 'd-flex');

        this.settings = new CoinTableSettings(pipe);
        if (!this.items.isDirty) {
            this.items.reload();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Coin>): Promise<void> {
        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new CoinOpenCommand({ id: item.data.id, isBriefly: true }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }
}
