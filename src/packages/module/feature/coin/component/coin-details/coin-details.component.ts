import { Component, ElementRef, Input } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Coin } from '@common/platform';
import { HlfObjectDetailsBaseComponent } from '@feature/hlf/component';
import * as _ from 'lodash';
import { Transport } from '@ts-core/common';

@Component({
    selector: 'coin-details',
    templateUrl: 'coin-details.component.html'
})
export class CoinDetailsComponent extends HlfObjectDetailsBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public item: Coin;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, transport: Transport) {
        super(transport);
        ViewUtil.addClasses(element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.item = null;
    }
}
