
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { ApiSocket, HlfObjectDetailsService, PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Auction } from '@common/platform';
import { AuctionAddedEvent } from '@common/platform/transport';
import { map, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class AuctionMapCollection extends PaginableDataSourceMapCollection<Auction, Auction> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: ApiSocket) {
        super('id');
        this.sort.created = false;
        socket.getDispatcher<AuctionAddedEvent>(AuctionAddedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(() => this.reload());
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Auction>> {
        return this.api.auctionList(this.createRequestData());
    }

    protected parseItem(item: Auction): Auction {
        return TransformUtil.toClass(Auction, item);
    }
}

export class AuctionTableSettings implements ICdkTableSettings<Auction> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Auction>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected pipe: PipeService, protected hlfObject: HlfObjectDetailsService) {
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'picture',
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
            name: 'nickname',
            headerId: 'nickname.nickname'
        })
        this.columns.push({
            name: 'price',
            headerId: 'auction.price',
            format: item => pipe.coinAmount.transform(item.price.value, item.price, true)
        })
        this.columns.push({
            name: 'status',
            headerId: 'auction.status.status',
            format: item => pipe.language.translate(`auction.status.${item.status}`)
        })
        this.columns.push({
            name: 'type',
            headerId: 'auction.type.type',
            format: item => pipe.language.translate(`auction.type.${item.type}`)
        })
        this.columns.push({
            name: 'created',
            headerId: 'auction.created',
            format: item => pipe.momentDate.transform(item.created)
        });
    }
}