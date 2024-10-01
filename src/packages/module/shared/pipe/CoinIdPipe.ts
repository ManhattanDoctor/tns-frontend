import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { LanguageService } from '@ts-core/frontend';
import { CoinUtil } from '@hlf-core/common';
import * as _ from 'lodash';

@Pipe({
    name: 'coinId'
})
export class CoinIdPipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private language: LanguageService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(coinUid: string): string {
        return this.language.translate(`coin.coinId.${CoinUtil.getCoinId(coinUid)}`);
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.language = null;
    }
}
