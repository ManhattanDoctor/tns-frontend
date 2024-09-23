import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common';
import { CoinTransferCommand } from '@feature/coin/transport';
import { NicknameTransferCommand } from '@feature/nickname/transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static EDIT = 10;
    private static COIN_TRANSFER = 10;

    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport) {
        super(language);

        let item: IListItem<void> = null;

        item = new ListItem('user.action.edit.edit', UserMenu.EDIT, null, 'fas fa-edit me-2');
        // item.action = (item, user) => transport.send(new UserEditCommand(user.id));
        // this.add(item)

        item = new ListItem('coin.transfer.transfer', UserMenu.COIN_TRANSFER, null, 'fas fa-coins me-2');
        item.action = (item, user) => transport.send(new CoinTransferCommand({ to: user.uid }));
        this.add(item)

        item = new ListItem('nickname.transfer.transfer', UserMenu.COIN_TRANSFER, null, 'fas fa-right-left me-2');
        item.action = (item, user) => transport.send(new NicknameTransferCommand({ to: user.uid }));
        this.add(item)

        this.complete();
    }
}
