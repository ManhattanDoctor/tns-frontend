import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterBaseService } from '@ts-core/angular';
import { NativeWindowService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class RouterService extends RouterBaseService {

    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static USERS_URL = 'users';
    public static AUCTIONS_URL = 'auctions';
    public static NICKNAMES_URL = 'nicknames';

    public static USER_URL = 'user';
    public static COIN_URL = 'coin';
    public static AUCTION_URL = 'auction';
    public static NICKNAME_URL = 'nickname';

    public static MESSAGE_URL = 'message';
    public static DEFAULT_URL = RouterService.USERS_URL;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(router: Router, route: ActivatedRoute, nativeWindow: NativeWindowService) {
        super(router, route, nativeWindow);
    }
}

