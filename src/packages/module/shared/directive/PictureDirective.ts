import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DefaultPictureDirective } from './DefaultPictureDirective';
import * as _ from 'lodash';

@Directive({
    selector: '[picture]',
})
export class PictureDirective extends DefaultPictureDirective<HTMLImageElement> {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _value: string;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef) {
        super(element);
        this.setDefaultPicture();
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('error')
    protected errorHandler = (): void => {
        if (!this.isAlreadyDefaultPicture) {
            this.setDefaultPicture();
        }
    };

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitValueProperties(): void {
        let value = null;

        value = this.value;
        if (value !== this.element.src) {
            this.setPicture(value);
        }
    }

    protected setPicture(value: string): void {
        super.setPicture(value);
        this.element.src = value;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get value(): string {
        return this._value;
    }
    @Input('picture')
    public set value(value: string) {
        if (value === this._value) {
            return;
        }
        this._value = value;
        this.commitValueProperties();
    }
}