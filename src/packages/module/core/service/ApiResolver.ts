import { Resolve } from '@angular/router';
import { PromiseHandler, LoadableEvent, DestroyableContainer } from '@ts-core/common';
import { Injectable } from '@angular/core';
import { WindowService } from '@ts-core/angular';
import { RouterService } from './RouterService';
import { ApiService } from './ApiService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ApiResolver extends DestroyableContainer implements Resolve<void> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private router: RouterService, private windows: WindowService, private api: ApiService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(): Promise<void> {
        if (this.api.isLoaded) {
            return Promise.resolve();
        }

        let promise = PromiseHandler.create();
        let subscription = this.api.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) {
                promise.resolve();
            } else if (data.type === LoadableEvent.ERROR) {
                let message = `Unable to initialize api ${this.api.api.url}`;
                if (!_.isNil(data.error)) {
                    this.windows.info(`${data.error.message}`);
                }
                this.router.navigate(`${RouterService.MESSAGE_URL}/${encodeURIComponent(message)}`);
                promise.reject(data.error.toString());
            } else if (data.type === LoadableEvent.FINISHED) {
                subscription.unsubscribe();
            }
        });
        return promise.promise;
    }
}
