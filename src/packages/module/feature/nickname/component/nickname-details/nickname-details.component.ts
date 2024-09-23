import { Component, ElementRef, Input } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Nickname } from '@common/platform';
import * as _ from 'lodash';
import { HlfObjectDetailsBaseComponent } from '@feature/hlf/component';
import { Transport } from '@ts-core/common';

@Component({
    selector: 'nickname-details',
    templateUrl: 'nickname-details.component.html'
})
export class NicknameDetailsComponent extends HlfObjectDetailsBaseComponent {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public nickname: Nickname;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, transport: Transport) {
        super(transport);
        ViewUtil.addClasses(container, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.nickname = null;
    }
}