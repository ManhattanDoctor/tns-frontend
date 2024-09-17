import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUtil } from '@ts-core/angular';
import { DestroyableContainer } from '@ts-core/common';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs';
import { LedgerUser } from '@common/ledger/user';

@Component({
    templateUrl: './user-page.component.html'
})
export class UserPageComponent extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _user: LedgerUser;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, route: ActivatedRoute) {
        super();
        ViewUtil.addClasses(container, 'd-user');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this._user = data.user);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): LedgerUser {
        return this._user;
    }
}
