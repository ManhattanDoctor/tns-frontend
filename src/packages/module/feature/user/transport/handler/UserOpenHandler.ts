import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { Transport, Logger } from '@ts-core/common';
import { UserOpenCommand } from '../UserOpenCommand';
import { HlfObjectDetailsService, RouterService } from '@core/service';
import { UserContainerComponent } from '../../component';
import { ComponentType } from '@angular/cdk/portal';
import { HlfObjectBaseOpenHandler } from '@feature/hlf/transport/handler';
import { User } from '@common/platform';
import { HlfObjectId } from '@core/lib';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserOpenHandler extends HlfObjectBaseOpenHandler<User> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private hlfObject: HlfObjectDetailsService) {
        super(logger, transport, UserOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getComponent(): ComponentType<any> {
        return UserContainerComponent;
    }

    protected async getItem(id: HlfObjectId): Promise<User> {
        if (_.isString(id)) {
            id = await this.hlfObject.id(id);
        }
        return this.api.userGet(id);
    }

    protected getUrl(id: HlfObjectId): string {
        return `${RouterService.USER_URL}/${id}`;
    }
}
