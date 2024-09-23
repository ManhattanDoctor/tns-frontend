import { Directive, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { PipeService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';

@Directive({
    selector: '[coin-id]'
})
export class CoinIdDirective extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _coinId: string;
    protected element: HTMLImageElement;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private pipe: PipeService) {
        super();
        this.element = element.nativeElement;
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitCoinIdProperties(): void {
        ViewUtil.setProperty(this.element, 'innerHTML', this.pipe.coinId.transform(this.coinId));
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();

        this.pipe = null;
        this.element = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    @Input('coin-id')
    public set coinId(value: string) {
        if (value == this._coinId) {
            return;
        }

        this._coinId = value;
        if (!_.isNil(value)) {
            this.commitCoinIdProperties();
        }
    }
    public get coinId(): string {
        return this._coinId;
    }
}
