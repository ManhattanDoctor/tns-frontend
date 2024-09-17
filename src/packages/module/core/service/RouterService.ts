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
    public static PROJECTS_URL = 'projects';
    public static COMPANIES_URL = 'companies';

    public static USER_URL = 'user';
    public static COMPANY_URL = 'company';
    public static PROJECT_URL = 'project';
    public static TRANSACTION_URL = 'transaction';

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

