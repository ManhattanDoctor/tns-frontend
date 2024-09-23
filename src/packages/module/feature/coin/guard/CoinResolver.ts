import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { RouterService } from '@core/service';
import { WindowService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { Coin } from '@common/platform';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinResolver implements Resolve<Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, private router: RouterService, private windows: WindowService) { }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Coin> {
        let id = route.params.id;
        if (_.isNil(id)) {
            let message = 'error.coinIdNotFound';
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            return await this.api.coinGet(id);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}