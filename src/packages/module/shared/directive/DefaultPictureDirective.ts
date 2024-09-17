import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Assets } from '@ts-core/frontend';
import * as _ from 'lodash';

@Directive()
export abstract class DefaultPictureDirective<T extends HTMLElement> implements OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected element: T;
    protected isAlreadyDefaultPicture: boolean = false;

    protected defaultPicture: string = 'default';

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected setDefaultPicture(): void {
        if (!_.isNil(this.element)) {
            this.setPicture(this.getDefaultPicture());
        }
    }

    protected getDefaultPicture(): string {
        return Assets.getImage(this.defaultPicture);
    }

    protected setPicture(value: string): void {
        this.isAlreadyDefaultPicture = value === this.getDefaultPicture();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        this.element = null;
        this.isAlreadyDefaultPicture = false;
    }

    public ngOnDestroy(): void {
        this.destroy();
    }
}