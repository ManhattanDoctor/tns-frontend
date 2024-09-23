import { Component, ViewContainerRef } from '@angular/core';
import { FilterableConditionType, FilterableDataType } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { ActionMapCollection, ActionFinanceTableSettings } from '@core/lib';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { ActionsComponent } from './actions.component';
import { ActionMenu } from '@feature/action/service';
import * as _ from 'lodash';

@Component({
    selector: 'finance-actions',
    templateUrl: 'actions.component.html',
    providers: [ActionMapCollection]
})
export class FinanceActionsComponent extends ActionsComponent {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ViewContainerRef,
        pipe: PipeService,
        hlfObject: HlfObjectDetailsService,
        transport: Transport,
        items: ActionMapCollection,
        menu: ActionMenu
    ) {
        super(element, pipe, hlfObject, transport, items, menu);
        this.settings = new ActionFinanceTableSettings(pipe, hlfObject);
        items.conditions.amount = { type: FilterableDataType.NUMBER, condition: FilterableConditionType.NOT_NULL, value: null };
    }
}
