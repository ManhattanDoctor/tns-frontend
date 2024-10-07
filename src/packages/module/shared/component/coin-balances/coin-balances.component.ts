import { Component, ViewContainerRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ICdkTableCellEvent, ICdkTableSettings } from '@ts-core/angular-material';
import { Transport } from '@ts-core/common';
import { CoinBalance, getCoinBalanceRoom } from '@common/platform';
import { CoinBalanceMapCollection, CoinBalanceObjectTableSettings, CoinBalanceTableSettings } from '@core/lib';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { HlfObjectOpenCommand } from '@feature/hlf/transport';
import { ViewUtil } from '@ts-core/angular';
import { TransportSocket } from '@ts-core/socket-client';
import { filter, map, takeUntil } from 'rxjs';
import { CoinBalanceChangedEvent } from '@common/platform/transport';
import { CoinOpenCommand } from '@feature/coin/transport';
import { Variables as AuctionVariables} from '@common/hlf/auction';
import * as _ from 'lodash';

@Component({
    selector: 'coin-balances',
    templateUrl: 'coin-balances.component.html',
    providers: [CoinBalanceMapCollection]
})
export class CoinBalancesComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _coinUid: string;
    private _uid: string;

    @Input()
    public settings: ICdkTableSettings<CoinBalance>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ViewContainerRef, private pipe: PipeService, private transport: Transport, private hlfObject: HlfObjectDetailsService, public items: CoinBalanceMapCollection, private socket: TransportSocket) {
        super();
        ViewUtil.addClasses(element.element, 'd-flex');

        socket.getDispatcher<CoinBalanceChangedEvent>(CoinBalanceChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => item.uid === this.uid),
                takeUntil(this.destroyed)
            ).subscribe(() => this.items.reload());
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitCoinUidProperties(): void {
        this.settings = new CoinBalanceObjectTableSettings(this.pipe, this.hlfObject);
        this.items.conditions.coinUid = AuctionVariables.coin.uid;
        this.items.reload();
    }

    private commitUidProperties(): void {
        this.settings = new CoinBalanceTableSettings(this.pipe);
        this.items.conditions.uid = this.uid;
        this.items.reload();
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<CoinBalance>): Promise<void> {
        if (item.column === 'uid' || item.column === 'picture') {
            this.transport.send(new HlfObjectOpenCommand({ id: item.data.uid, isBriefly: true }));
        }
        else {
            this.transport.send(new CoinOpenCommand({ id: item.data.id, isBriefly: true }));
        }
    }

    protected itemOpenedHandler(item: string): void {
        this.socket.roomAdd(getCoinBalanceRoom(item));
    }

    protected itemClosedHandler(item: string): void {
        this.socket.roomRemove(getCoinBalanceRoom(item));
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.coinUid = null;
        this.uid = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get uid(): string {
        return this._uid;
    }
    @Input()
    public set uid(value: string) {
        if (value === this._uid) {
            return;
        }
        if (!_.isNil(this._uid)) {
            this.itemClosedHandler(this._uid);
        }

        this._uid = value;
        if (!_.isNil(value)) {
            this.commitUidProperties();
            this.itemOpenedHandler(this._uid);
        }
    }

    public get coinUid(): string {
        return this._coinUid;
    }
    @Input()
    public set coinUid(value: string) {
        if (value === this._coinUid) {
            return;
        }
        this._coinUid = value;
        if (!_.isNil(value)) {
            this.commitCoinUidProperties();
        }
    }

}
