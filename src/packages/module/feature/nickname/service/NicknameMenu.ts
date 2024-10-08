import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common';
import * as _ from 'lodash';
import { NicknameTransferCommand } from '../transport';

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
        item = new ListItem('nickname.transfer.transfer', NicknameMenu.TRANSFER, null, 'fas fa-right-left me-2');
        item.action = (item, nickname) => transport.send(new NicknameTransferCommand({ to: user.uid }));
        this.add(item)
        */
       
        this.complete();
    }
}
