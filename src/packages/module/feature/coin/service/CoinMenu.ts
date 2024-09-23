import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common';
import { Coin } from '@common/platform';
import { CoinOpenCommand } from '../transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static OPEN = 10;
    private static DEPOSIT = 20;
    private static WITHDRAW = 30;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport) {
        super(language);

        let item: MenuListItem = null;

        item = new ListItem('coin.coin', CoinMenu.OPEN, null, 'fas fa-coins me-2');
        item.action = (item, coin) => transport.send(new CoinOpenCommand({ id: coin.id, isBriefly: true }));
        this.add(item);

        /*
        item = new ListItem('coin.action.deposit.deposit', CoinMenu.DEPOSIT, null, 'fas fa-plus me-2');
        item.checkEnabled = (item, coin) => CoinUtil.isHasHlfBridge(coin.coinId);
        item.action = (item, coin) => transport.send(new CoinDepositOpenCommand({ id: coin.id }));
        this.add(item);

        item = new ListItem('coin.action.withdraw.withdraw', CoinMenu.WITHDRAW, null, 'fas fa-minus me-2');
        item.checkEnabled = (item, coin) => CoinUtil.isHasHlfBridge(coin.coinId);
        item.action = (item, coin) => transport.send(new CoinWithdrawOpenCommand({ id: coin.id }));
        this.add(item);
        */
        this.complete();
    }
}

class MenuListItem extends ListItem<void> {
    declare action: (item: ListItem, coin: Coin) => void;
    declare checkEnabled: (item: ListItem, coin: Coin) => boolean;
}
