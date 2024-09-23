import { Component } from '@angular/core';
import { DestroyableContainer, Transport } from '@ts-core/common';
import { HlfObject, HlfObjectId } from '@core/lib';
import { HlfObjectBaseComponent } from './HlfObjectBaseComponent';
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export class HlfObjectDetailsBaseComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(protected transport: Transport) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public open<U extends HlfObject | HlfObjectId>(item: U, isBriefly: boolean = true): void {
        HlfObjectBaseComponent.open(this.transport, item, isBriefly);
    }
}