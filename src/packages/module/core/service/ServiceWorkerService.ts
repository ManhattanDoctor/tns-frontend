import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Loadable, LoadableStatus, Logger } from '@ts-core/common';
import { takeUntil, filter } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerService extends Loadable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(updates: SwUpdate, logger: Logger) {
        super();

        updates.versionUpdates.pipe(filter(event => event.type === 'VERSION_DETECTED'), takeUntil(this.destroyed)).subscribe(() => {
            this.status = LoadableStatus.LOADING;
        });
        updates.versionUpdates.pipe(filter(event => event.type === 'VERSION_READY'), takeUntil(this.destroyed)).subscribe(async () => {
            try {
                await updates.activateUpdate();
                this.status = LoadableStatus.LOADED;
            }
            catch (error) {
                this.status = LoadableStatus.ERROR;
                logger.error(`Unable to activate version: ${error}`);
            }
        });
        updates.unrecoverable.pipe(takeUntil(this.destroyed)).subscribe(event => {
            this.status = LoadableStatus.ERROR;
            logger.error(`Unable to update version: ${event.reason}`);
        });
    }

}
