import { Injectable } from '@angular/core';
import { ExtendedError, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { SingerAddCommand } from '../SignerAddCommand';
import { WindowConfig, WindowService } from '@ts-core/angular';
import { SingerAddComponent } from '../../component';
import { SignerService } from '../../service';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SingerAddHandler extends TransportCommandHandler<void, SingerAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private signer: SignerService, private windows: WindowService) {
        super(logger, transport, SingerAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        let windowId = 'signerAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 450);
        config.id = windowId;

        let content = this.windows.open(SingerAddComponent, config) as SingerAddComponent;
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case SingerAddComponent.EVENT_ADDED:
                    content.isDisabled = true;
                    try {
                        await this.signer.add(content.serialize());
                    } catch (error: any) {
                        this.windows.info(ExtendedError.create(error).message);
                    } finally {
                        content.isDisabled = false;
                    }
                    content.close();
                    break;
            }
        });
    }
}
