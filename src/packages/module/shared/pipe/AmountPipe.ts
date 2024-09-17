import { Pipe } from '@angular/core';
import { DestroyableContainer, MathUtil } from '@ts-core/common';
import { FinancePipe, PrettifyPipe } from '@ts-core/angular';
import { Variables as AuctionVariables } from '@project/common/hlf/auction';
import * as _ from 'lodash';

@Pipe({
    name: 'amount',
})
export class AmountPipe extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    private finance: FinancePipe;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super();
        this.finance = new FinancePipe();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(amount: string): string {
        if (_.isNil(amount)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        let value = MathUtil.divide(amount, MathUtil.pow('10', AuctionVariables.coin.decimals.toString()))
        return this.finance.transform(value);
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.finance = null;
    }
}
