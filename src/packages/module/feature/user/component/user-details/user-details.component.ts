import { Component, ElementRef, Input } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@common/platform';
import * as _ from 'lodash';
import { HlfObjectDetailsBaseComponent } from '@feature/hlf/component';
import { Transport } from '@ts-core/common';

@Component({
    selector: 'user-details',
    templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent extends HlfObjectDetailsBaseComponent {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public user: User;

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
        this.user = null;
    }
}