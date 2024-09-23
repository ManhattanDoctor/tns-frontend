import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common';
import { Coin } from '@common/platform';
import * as _ from 'lodash';

@Injectable()
export class CoinMapCollection extends PaginableDataSourceMapCollection<Coin, Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super('id');
        this.sort.created = false;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Coin>> {
        return this.api.coinList(this.createRequestData());
    }

    protected parseItem(item: Coin): Coin {
        return TransformUtil.toClass(Coin, item);
    }
}

export class CoinTableSettings implements ICdkTableSettings<Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Coin>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService) {
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'coinId',
            headerId: 'coin.coinId.coinId',
            format: item => item.coinId
        })
        this.columns.push({
            name: 'inUse',
            headerId: 'coin.inUse',
            className: 'text-success',
            format: item => pipe.coinAmount.transform(item.balance.inUse, null, false)
        })
        this.columns.push({
            name: 'held',
            headerId: 'coin.held',
            className: 'text-danger',
            format: item => pipe.coinAmount.transform(item.balance.held, null, false)
        })
        /*
        this.columns.push({
            name: 'total',
            headerId: 'coin.total',
            format: item => pipe.amount.transform(item.balance.total)
        })
        */
        this.columns.push({
            name: 'emitted',
            headerId: 'coin.emitted',
            className: 'text-success',
            format: item => pipe.coinAmount.transform(item.balance.emitted, null, false)
        })
        this.columns.push({
            name: 'burned',
            headerId: 'coin.burned',
            className: 'text-danger',
            format: item => pipe.coinAmount.transform(item.balance.burned, null, false)
        })
    }
}
