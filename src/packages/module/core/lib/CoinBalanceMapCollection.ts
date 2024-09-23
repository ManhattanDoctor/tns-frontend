import { ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common';
import { CoinUtil } from '@hlf-core/common';
import { CoinBalance } from '@common/platform';
import * as _ from 'lodash';

@Injectable()
export class CoinBalanceMapCollection extends PaginableDataSourceMapCollection<CoinBalance, CoinBalance> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super(`uid`);
        this.sort.total = false;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<CoinBalance>> {
        return this.api.coinBalanceList(this.createRequestData());
    }

    protected parseItem(item: CoinBalance): CoinBalance {
        let value = TransformUtil.toClass(CoinBalance, item);
        value.uid = `${item.id}_${item.uid}`;
        return value;
    }
}


export class CoinBalanceTableSettings implements ICdkTableSettings<CoinBalance> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<CoinBalance>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService) {
        this.columns = [];
        this.columns.push({
            name: 'coinId',
            headerClassName: 'ps-3',
            className: 'ps-3',
            headerId: 'coin.coinId.coinId',
            format: item => pipe.coinId.transform(item.coinUid)
        })
        this.columns.push({
            name: 'inUse',
            headerId: 'coin.inUse',
            className: 'text-success',
            format: item => pipe.coinAmount.transform(item.inUse, item, false)
        })
        this.columns.push({
            name: 'held',
            headerId: 'coin.held',
            className: 'text-danger',
            format: item => pipe.coinAmount.transform(item.held, item, false)
        })
        this.columns.push({
            name: 'total',
            headerId: 'coin.total',
            format: item => pipe.coinAmount.transform(item.total, item, false)
        })
    }
}

export class CoinBalanceObjectTableSettings implements ICdkTableSettings<CoinBalance> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<CoinBalance>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, hlfObject: HlfObjectDetailsService) {
        this.columns = [];

        this.columns.push({
            name: 'picture',
            headerClassName: 'ps-3',
            className: 'ps-3',
            isImage: true,
            isAsync: true,
            isDisableSort: true,
            cellStyleName: () => {
                return { width: '32px', height: '32px' };
            },
            cellClassName: 'border rounded my-2',
            format: async item => await hlfObject.picture(item.uid)
        })
        this.columns.push({
            name: 'objectUid',
            isAsync: true,
            headerId: 'coin.objectUid',
            format: async item => await hlfObject.name(item.uid)
        })
        this.columns.push({
            name: 'inUse',
            headerClassName: 'ps-3',
            headerId: 'coin.inUse',
            className: 'ps-3 text-success',
            format: item => pipe.coinAmount.transform(item.inUse, item, false)
        })
        this.columns.push({
            name: 'held',
            headerId: 'coin.held',
            className: 'text-danger',
            format: item => pipe.coinAmount.transform(item.held, item, false)
        })
    }
}

