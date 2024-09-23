import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Nickname } from '@common/platform';
import * as _ from 'lodash';

@Component({
    templateUrl: 'nickname-page.component.html',
})
export class NicknamePageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public nickname: Nickname;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, route: ActivatedRoute) {
        super();
        ViewUtil.addClasses(element, 'd-block container px-3 px-lg-4 pb-3 pt-4 pb-lg-4');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this.nickname = data.nickname);
    }
}
