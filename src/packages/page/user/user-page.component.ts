import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { User } from '@common/platform';
import * as _ from 'lodash';

@Component({
    templateUrl: 'user-page.component.html',
})
export class UserPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public user: User;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, route: ActivatedRoute) {
        super();
        ViewUtil.addClasses(element, 'd-block container px-3 px-lg-4 pb-3 pt-4 pb-lg-4');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this.user = data.item);
    }
}
