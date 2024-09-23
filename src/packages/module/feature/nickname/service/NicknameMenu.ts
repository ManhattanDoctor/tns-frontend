import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common';
import { CoinTransferCommand } from '@feature/coin/transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class NicknameMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static TRANSFER = 10;

    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport) {
        super(language);

        let item: IListItem<void> = null;

        /*
        item = new ListItem('coin.transfer.transfer', NicknameMenu.COIN_TRANSFER, null, 'fas fa-coins me-2');
        item.action = (item, user) => transport.send(new CoinTransferCommand({ to: user.uid }));
        this.add(item)
        */

        this.complete();
    }
}
