import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { FinancePipe, PrettifyPipe } from '@ts-core/angular';
import { CoinIdPipe } from './CoinIdPipe';
import { LanguageService } from '@ts-core/frontend';
import { CoinUtil, ICoinAmount } from '@hlf-core/common';
import { Action, Coin, CoinBalance } from '@common/platform';
import * as _ from 'lodash';

@Pipe({
    name: 'coinAmount'
})
export class CoinAmountPipe extends DestroyableContainer implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    private coinId: CoinIdPipe;
    private finance: FinancePipe;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService) {
        super();
        this.coinId = new CoinIdPipe(language);
        this.finance = new FinancePipe();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(amount: string, coin: CoinType, isNeedCoinId: boolean = true): string {
        if (_.isNil(amount) || _.isNil(coin)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        let coinUid = !_.isNil(coin['coinUid']) ? coin['coinUid'] : coin['uid'];
        let value = this.finance.transform(CoinUtil.fromCent(amount, CoinUtil.getCoinDecimals(coinUid)), '0,0.[000000000000000000]');
        return !isNeedCoinId ? value : `${value} ${this.coinId.transform(coinUid)}`;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        if (!_.isNil(this.coinId)) {
            this.coinId.destroy();
            this.coinId = null;
        }
        this.finance = null;
    }
}

export type CoinType = ICoinAmount | Coin | CoinBalance | Action;

/*
interface ICoinDetails {
    coinId?: string;
    coinUid?: string;
    decimals?: number;
}
*/
