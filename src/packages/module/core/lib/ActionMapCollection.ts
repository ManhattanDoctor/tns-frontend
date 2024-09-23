
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CoinUtil } from "@hlf-core/common";
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Action, ActionType } from '@common/platform';
import * as _ from 'lodash';

@Injectable()
export class ActionMapCollection extends PaginableDataSourceMapCollection<Action, Action> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super(`id`);
        this.sort.date = false;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Action>> {
        return this.api.actionList(this.createRequestData());
    }

    protected parseItem(item: Action): Action {
        return TransformUtil.toClass(Action, item);
    }
}

export class ActionTableSettings implements ICdkTableSettings<Action> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Action>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected pipe: PipeService, protected hlfObject: HlfObjectDetailsService) {
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'date',
            headerId: 'hlf.action.date',
            format: item => pipe.momentDate.transform(item.date)
        });
        this.columns.push({
            name: 'objectUid',
            headerId: 'hlf.action.type.type',
            isAsync: true,
            format: async item => this.description(item)
        })
    }

    // --------------------------------------------------------------------------
    //
    // 	Help Methods
    //
    // --------------------------------------------------------------------------

    protected isPositive(item: Action | ActionType): boolean {
        if (item instanceof Action) {
            item = item.type;
        }
        switch (item) {
            case ActionType.COIN_EMITTED:
            case ActionType.COIN_UNHOLDED:
            case ActionType.COIN_TRANSFER_RECEIVE:
                return true;
            default:
                return false;
        }
    }

    protected isNegative(item: Action | ActionType): boolean {
        if (item instanceof Action) {
            item = item.type;
        }
        switch (item) {
            case ActionType.COIN_BURNED:
            case ActionType.COIN_HOLDED:
            case ActionType.COIN_TRANSFER_SENT:
                return true;
            default:
                return false;
        }
    }

    protected className(item: Action): string {
        if (this.isPositive(item)) {
            return 'text-success';
        }
        if (this.isNegative(item)) {
            return 'text-danger';
        }
        return null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Description Methods
    //
    // --------------------------------------------------------------------------

    protected async description(item: Action): Promise<string> {
        let type = item.type;
        let translate = this.translateGet(item);
        if (type === ActionType.USER_ADDED ||
            type === ActionType.COIN_ADDED ||
            type === ActionType.AUCTION_ADDED ||
            type === ActionType.NICKNAME_ADDED) {
            await this.objectAdd(item.objectUid, translate);
        }
        else if (type === ActionType.COIN_TRANSFER_RECEIVE ||
            type === ActionType.COIN_TRANSFER_SENT ||
            type === ActionType.COIN_BURNED) {
            translate = await this.objectAdd(item.objectUid, translate);
        }
        return this.pipe.language.translate(`hlf.action.type.description.${type}`, translate);
    }

    protected translateGet(item: Action): any {
        let translate = {} as any;
        if (!_.isNil(item.coinUid)) {
            translate.coinId = CoinUtil.getCoinId(item.coinUid);
        }
        if (!_.isNil(item.amount)) {
            translate.coinAmount = this.pipe.coinAmount.transform(item.amount, item, true);
        }
        return translate;
    }

    protected async objectAdd<T>(uid: string, translate: T): Promise<T> {
        return this.translationAdd(uid, 'object', translate);
    }
    protected async userAdd<T>(uid: string, translate: T): Promise<T> {
        return this.translationAdd(uid, 'user', translate);
    }
    protected async nicknameAdd<T>(uid: string, translate: T): Promise<T> {
        return this.translationAdd(uid, 'nickname', translate);
    }
    protected async auctionAdd<T>(uid: string, translate: T): Promise<T> {
        return this.translationAdd(uid, 'auction', translate);
    }
    protected async translationAdd<T>(uid: string, prefix: string, translate: T): Promise<T> {
        let item = await this.hlfObject.get(uid);
        translate[`${prefix}Name`] = item.name;
        translate[`${prefix}Picture`] = item.picture;
        translate[`${prefix}Description`] = item.description;
        return translate;
    }

}

export class ActionFinanceTableSettings extends ActionTableSettings {

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, hlfObject: HlfObjectDetailsService) {
        super(pipe, hlfObject);
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'date',
            headerId: 'hlf.action.date',
            format: item => pipe.momentDate.transform(item.date)
        });
        this.columns.push({
            name: 'amount',
            headerId: 'coin.amount',
            className: item => this.className(item),
            format: item => this.amount(item)
        });
        this.columns.push({
            name: 'objectUid',
            headerId: 'hlf.action.type.type',
            isAsync: true,
            format: async item => this.description(item)
        })
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected async description(item: Action): Promise<string> {
        return this.pipe.language.translate(`hlf.action.type.description.${item.type}`);
    }

    protected amount(item: Action): string {
        let translate = this.translateGet(item);
        let value = translate.coinAmount;
        if (this.isPositive(item)) {
            value = `+${value}`;
        }
        else if (this.isNegative(item)) {
            value = `-${value}`;
        }
        return `<b>${value}</b>`
    }

}
