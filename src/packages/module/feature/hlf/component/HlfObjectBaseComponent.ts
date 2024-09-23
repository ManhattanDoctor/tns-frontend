import { Component, Input, ViewContainerRef } from '@angular/core';
import { IWindowContent } from '@ts-core/angular';
import { Transport, ClassType, ITransport } from '@ts-core/common';
import { HlfObjectOpenBaseCommand } from '@feature/hlf/transport';
import { Coin, Nickname, User } from '@common/platform';
import { UserOpenCommand } from '@feature/user/transport';
import { getType, HlfObjectType  } from '@common/hlf';
import { HlfObjectId, HlfObject } from '@core/lib';
import { NicknameOpenCommand } from '@feature/nickname/transport';
import { CoinOpenCommand } from '@feature/coin/transport';
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export class HlfObjectBaseComponent<U extends HlfObject> extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static open<U extends HlfObject | HlfObjectId>(transport: ITransport, item: U, isBriefly: boolean): void {
        let type = _.isString(item) ? getType(item) : null;
        let Command: ClassType<HlfObjectOpenBaseCommand<HlfObjectId>> = null;
        if (item instanceof Coin || type === HlfObjectType.COIN) {
            Command = CoinOpenCommand;
        }
        else if (item instanceof User || type === HlfObjectType.USER) {
            Command = UserOpenCommand;
        }
        else if (item instanceof Nickname || type === HlfObjectType.NICKNAME) {
            Command = NicknameOpenCommand;
        }
        if (!_.isNil(Command)) {
            transport.send(new Command({ id: _.isObject(item) ? item.id : item, isBriefly }));
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _item: U;
    protected _isBriefly: boolean;

    @Input()
    public isOpenBriefly: boolean = false;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, protected transport: Transport) {
        super(container);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitItemProperties(): void { }

    protected commitIsBrieflyProperties(): void { }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected itemOpenedHandler(item: U): void { };
    
    protected itemClosedHandler(item: U): void { };

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async open(item?: U, isBriefly?: boolean): Promise<void> {
        if (_.isNil(item)) {
            item = this.item;
        }
        if (_.isNil(isBriefly)) {
            isBriefly = this.isOpenBriefly;
        }

        HlfObjectBaseComponent.open(this.transport, item, isBriefly);

        if (this.isBriefly) {
            this.close();
        }
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.item = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get item(): U {
        return this._item;
    }
    @Input()
    public set item(value: U) {
        if (value === this._item) {
            return;
        }
        if (!_.isNil(this._item)) {
            this.itemClosedHandler(this._item);
        }
        this._item = value;
        if (!_.isNil(value)) {
            this.itemOpenedHandler(this._item);
            this.commitItemProperties();
        }
    }

    public get isBriefly(): boolean {
        return this._isBriefly;
    }
    @Input()
    public set isBriefly(value: boolean) {
        if (value === this._isBriefly) {
            return;
        }
        this._isBriefly = value;
        if (!_.isNil(value)) {
            this.commitIsBrieflyProperties();
        }
    }
}
