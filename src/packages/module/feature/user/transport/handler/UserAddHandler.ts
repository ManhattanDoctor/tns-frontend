import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { UserAddCommand } from '../UserAddCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { ApiService } from '@core/service';
import { UserAddComponent } from '../../component';
import { UserAddCommand as HlfUserAddCommand } from '@common/hlf/acl/transport';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserAddHandler extends TransportCommandHandler<void, UserAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private windows: WindowService, private api: ApiService) {
        super(logger, transport, UserAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        let windowId = 'UserAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(UserAddComponent, config) as UserAddComponent;
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case UserAddComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.hlf.ledgerRequestSendListen(new HlfUserAddCommand(content.serialize()));
                        content.close();
                    } catch (error: any) {
                        this.windows.info(ExtendedError.create(error).message);
                    } finally {
                        content.isDisabled = false;
                    }
                    break;
            }
        });
    }
}
