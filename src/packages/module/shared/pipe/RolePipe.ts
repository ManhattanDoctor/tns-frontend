import { Pipe, PipeTransform } from '@angular/core';
import { PipeBaseService } from '@ts-core/angular';
import * as _ from 'lodash';

@Pipe({
    name: 'role',
})
export class RolePipe implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(value: string | Array<string>): string {
        let item = null;
        if (_.isArray(value)) {
            item = value.map(item => this.transform(item)).join(', ');
        } else if (_.isString(value)) {
            item = this.pipe.language.translate(`role.type.${value}`);
        }
        return _.upperFirst(this.pipe.prettify.transform(item).toLowerCase());
    }

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private pipe: PipeBaseService) { }
}
