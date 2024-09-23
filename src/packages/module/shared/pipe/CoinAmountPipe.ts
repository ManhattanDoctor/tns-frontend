import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { FinancePipe, PrettifyPipe } from '@ts-core/angular';
import { CoinIdPipe } from './CoinIdPipe';
import { LanguageService } from '@ts-core/frontend';
import { CoinUtil } from '@hlf-core/common';
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

    public transform(amount: string, coin: ICoinDetails, isNeedCoinId: boolean = true): string {
        if (_.isNil(amount) || _.isNil(coin)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        let value = this.finance.transform(CoinUtil.fromCent(amount, coin.decimals), '0,0.[000000000000000000]');
        let coinId = !_.isNil(coin.coinId) ? coin.coinId : coin.coinUid;
        return !isNeedCoinId ? value : `${value} ${this.coinId.transform(coinId)}`;
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

interface ICoinDetails {
    coinId?: string;
    coinUid?: string;
    decimals?: number;
}
