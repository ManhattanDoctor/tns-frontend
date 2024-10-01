
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { ApiSocket, HlfObjectDetailsService, PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Nickname } from '@common/platform';
import { NicknameAddedEvent } from '@common/platform/transport';
import { map, takeUntil } from 'rxjs';
import { TransportSocket } from '@ts-core/socket-client';
import * as _ from 'lodash';

@Injectable()
export class NicknameMapCollection extends PaginableDataSourceMapCollection<Nickname, Nickname> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: TransportSocket) {
        super('id');
        
        this.sort.created = false;
        socket.getDispatcher<NicknameAddedEvent>(NicknameAddedEvent.NAME)
            .pipe(
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

    protected request(): Promise<IPagination<Nickname>> {
        return this.api.nicknameList(this.createRequestData());
    }

    protected parseItem(item: Nickname): Nickname {
        return TransformUtil.toClass(Nickname, item);
    }
}

export class NicknameTableSettings implements ICdkTableSettings<Nickname> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Nickname>>;

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
            name: 'ownerUid',
            headerId: 'nickname.ownerUid'
        })
        this.columns.push({
            name: 'parentUid',
            headerId: 'nickname.parentUid',
            format: item => pipe.prettify.transform(item.parentUid)
        })
        this.columns.push({
            name: 'created',
            headerId: 'user.created',
            format: item => pipe.momentDate.transform(item.created)
        });
    }
}