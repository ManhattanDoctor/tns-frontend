import { Component, ElementRef, Input } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Auction } from '@common/platform';
import * as _ from 'lodash';
import { HlfObjectDetailsBaseComponent } from '@feature/hlf/component';
import { Transport } from '@ts-core/common';

@Component({
    selector: 'auction-details',
    templateUrl: 'auction-details.component.html'
})
export class AuctionDetailsComponent extends HlfObjectDetailsBaseComponent {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public auction: Auction;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, transport: Transport) {
        super(transport);
        ViewUtil.addClasses(container, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.auction = null;
    }
}