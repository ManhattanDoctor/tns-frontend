import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { Transport, Logger } from '@ts-core/common';
import { NicknameOpenCommand } from '../NicknameOpenCommand';
import { HlfObjectDetailsService, RouterService } from '@core/service';
import { NicknameContainerComponent } from '../../component';
import { ComponentType } from '@angular/cdk/portal';
import { HlfObjectBaseOpenHandler } from '@feature/hlf/transport/handler';
import { Nickname } from '@common/platform';
import { HlfObjectId } from '@core/lib';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class NicknameOpenHandler extends HlfObjectBaseOpenHandler<Nickname> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private hlfObject: HlfObjectDetailsService) {
        super(logger, transport, NicknameOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getComponent(): ComponentType<any> {
        return NicknameContainerComponent;
    }

    protected async getItem(id: HlfObjectId): Promise<Nickname> {
        if (_.isString(id)) {
            id = await this.hlfObject.id(id);
        }
        return this.api.nicknameGet(id);
    }

    protected getUrl(id: HlfObjectId): string {
        return `${RouterService.NICKNAME_URL}/${id}`;
    }
}
