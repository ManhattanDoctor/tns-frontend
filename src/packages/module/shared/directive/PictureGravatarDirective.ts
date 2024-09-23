import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { PictureDirective } from './PictureDirective';
import { TweetNaCl } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';

@Directive({
    selector: '[picture-gravatar]',
})
export class PictureGravatarDirective extends PictureDirective {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _size: number = 200;
    protected _rating: string = PictureGravatarRating.G;
    protected _display: string = PictureGravatarDisplay.IDENTICON;

    @Input()
    public isNeedHash: boolean = true;
    @Input()
    public isForceDefault: boolean = false;

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

        value = this.getGravatarUrl(this.value);
        if (value !== this.element.src) {
            this.setPicture(value);
        }
    }

    protected commitSizeProperties(): void {
        this.commitValueProperties();
        ViewUtil.setStyle(this.element, 'width', `${this.size}px`);
        ViewUtil.setStyle(this.element, 'height', `${this.size}px`);
    }

    protected getGravatarUrl(item: string): string {
        let hash = this.isNeedHash ? TweetNaCl.hash(item) : item;
        let value = `https://www.gravatar.com/avatar/${hash}?s=${this.size}&d=${this.display}&r=${this.rating}`;
        if (this.isForceDefault) {
            value += `${value}&f=y`;
        }
        return value;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get rating(): string {
        return this._rating;
    }
    @Input()
    public set rating(value: string) {
        if (value === this._rating) {
            return;
        }
        this._rating = value;
        this.commitValueProperties();
    }

    public get display(): string {
        return this._display;
    }
    @Input()
    public set display(value: string) {
        if (value === this._display) {
            return;
        }
        this._display = value;
        this.commitValueProperties();
    }

    public get size(): number {
        return this._size;
    }
    @Input()
    public set size(value: number) {
        if (value === this._size) {
            return;
        }
        this._size = value;
        this.commitSizeProperties();
    }

    public get value(): string {
        return super.value;
    }
    @Input('picture-gravatar')
    public set value(value: string) {
        super.value = value;
    }
}

export enum PictureGravatarDisplay {
    ERROR_404 = '404',
    MP = 'mp',
    IDENTICON = 'identicon',
    MONSTERID = 'monsterid',
    WAVATAR = 'wavatar',
    RETRO = 'retro',
    ROBOHASH = 'robohash',
    BLANK = 'blank',
}

export enum PictureGravatarRating {
    G = 'g',
    PG = 'pg',
    R = 'r',
    X = 'x',
}