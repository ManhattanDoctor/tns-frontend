import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { ViewUtil, WindowEvent } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { HlfObjectBaseComponent } from './HlfObjectBaseComponent';
import { HlfObject } from '@core/lib';
import { filter, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export class HlfObjectContainerBaseComponent<U extends HlfObject, V = any> extends HlfObjectBaseComponent<U> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _details: V;

    @Output()
    public back: EventEmitter<void> = new EventEmitter();
    @Output()
    public forward: EventEmitter<void> = new EventEmitter();
    @Output()
    public backward: EventEmitter<void> = new EventEmitter();

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, transport: Transport) {
        super(container, transport);
        ViewUtil.addClasses(container, 'd-flex flex-column background rounded');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitWindowProperties(): void {
        super.commitWindowProperties();
        this.events.pipe(
            filter(item => item === WindowEvent.EXPAND),
            takeUntil(this.destroyed)).subscribe(() => this.open(this.item, false));
    }

    protected commitDetailsProperties(): void { }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    public headerClickHandler(event: MouseEvent): void {
        let container = event.target as HTMLElement;

        if (this.isBriefly) {
            if (event.offsetY <= ViewUtil.getHeight(container) / 2) {
                this.open(this.item, false);
            } else {
                this.close();
            }
            return;
        }

        if (!this.isBriefly) {
            if (event.offsetX <= ViewUtil.getWidth(container) / 2) {
                this.backward.emit();
            } else {
                this.forward.emit();
            }
        }
    }

    public headerTapHandler($event: any): void {
        let event = $event.srcEvent as PointerEvent;
        this.headerClickHandler(event);
    }

    public headerSwipeUpHandler(): void {
        if (this.isBriefly) {
            this.open(this.item, false);
        }
    }

    public headerSwipeDownHandler(): void {
        if (this.isBriefly) {
            this.close();
        }
    }

    public headerSwipeLeftHandler(): void {
        if (!this.isBriefly) {
            this.forward.emit();
        }
    }
    public headerSwipeRightHandler(): void {
        if (!this.isBriefly) {
            this.backward.emit();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get details(): V {
        return this._details;
    }
    @Input()
    public set details(value: V) {
        if (value === this._details) {
            return;
        }
        this._details = value;
        if (!_.isNil(value)) {
            this.commitDetailsProperties();
        }
    }
}
