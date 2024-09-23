import { Injectable } from '@angular/core';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { Transport, Logger } from '@ts-core/common';
import { HlfObjectDetailsService, RouterService } from '@core/service';
import { CoinOpenCommand } from '../CoinOpenCommand';
import { ComponentType } from '@angular/cdk/portal';
import { CoinContainerComponent } from '../../component';
import { Coin } from '@common/platform';
import { Client } from '@common/platform/api';
import { HlfObjectBaseOpenHandler } from '@feature/hlf/transport/handler';
import { HlfObjectId } from '@core/lib';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinOpenHandler extends HlfObjectBaseOpenHandler<Coin> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private hlfObject: HlfObjectDetailsService) {
        super(logger, transport, CoinOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected getComponent(): ComponentType<any> {
        return CoinContainerComponent;
    }

    protected async getItem(id: HlfObjectId): Promise<Coin> {
        if (_.isString(id)) {
            id = await this.hlfObject.id(id);
        }
        return this.api.coinGet(id);
    }

    protected getUrl(id: HlfObjectId): string {
        return `${RouterService.COIN_URL}/${id}`;
    }
}
