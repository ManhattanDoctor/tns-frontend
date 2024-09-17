import { Injectable } from '@angular/core';
import { Transport, Destroyable } from '@ts-core/common';
import { ThemeService } from '@ts-core/frontend';
import { ServiceWorkerService } from './ServiceWorkerService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoreInitializer extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        theme: ThemeService,
        transport: Transport,
        serviceWorker: ServiceWorkerService
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async initialize(): Promise<void> { }
}
