
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { ApiSocket, HlfObjectDetailsService, PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Nickname, User } from '@common/platform';
import { UserAddedEvent } from '@common/platform/transport';
import { map, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class UserMapCollection extends PaginableDataSourceMapCollection<User, User> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: ApiSocket) {
        super('id');
        this.sort.created = false;
        socket.getDispatcher<UserAddedEvent>(UserAddedEvent.NAME)
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

    protected request(): Promise<IPagination<User>> {
        return this.api.userList(this.createRequestData());
    }

    protected parseItem(item: User): User {
        return TransformUtil.toClass(User, item);
    }
}

export class UserTableSettings implements ICdkTableSettings<User> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<User>>;

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
            name: 'address',
            headerId: 'user.address',
        })
        this.columns.push({
            name: 'nickname',
            headerId: 'user.nickname',
            format: item => pipe.prettify.transform(Nickname.getNicknameByUid(item.nicknameUid))
        })
        this.columns.push({
            name: 'created',
            headerId: 'user.created',
            format: item => pipe.momentDate.transform(item.created)
        });
    }
}