import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { HlfObjectDetailsService } from '@core/service';
import * as _ from 'lodash';

@Pipe({
    name: 'hlfObjectPicture',
    pure: false,
})
export class HlfObjectPicturePipe extends DestroyableContainer implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    private value: string;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private detection: ChangeDetectorRef, private details: HlfObjectDetailsService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public async transform(uid: string): Promise<string> {
        if (!_.isNil(this.value)) {
            return this.value;
        }

        let value = null;
        this.details.get(uid)
            .then(item => {
                value = this.value = item.picture;
            })
            .finally(() => {
                this.detection.markForCheck();
            });
        return value;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        this.details = null
        this.detection = null
    }
}
