import { Injectable } from '@angular/core';
import { SettingsBaseService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SettingsService extends SettingsBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public get isProduction(): boolean {
        return SettingsBaseService.parseBoolean(this.getValue('isProduction'));
    }
}
