import { SelectListItem, SelectListItems, ISelectListItem, LoginGuard } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { RouterService } from '@core/service';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class ShellMenu extends SelectListItems<ISelectListItem<string>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static USERS = 0;
    private static AUCTIONS = 2;
    private static NICKNAMES = 1;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, router: RouterService) {
        super(language);

        let item: ISelectListItem<string> = null;
        this.add(new ShellListItem('user.users', ShellMenu.USERS, `/${RouterService.USERS_URL}`, 'fas fa-users'));
        this.add(new ShellListItem('auction.auctions', ShellMenu.AUCTIONS, `/${RouterService.AUCTIONS_URL}`, 'fas fa-gavel'));
        this.add(new ShellListItem('nickname.nicknames', ShellMenu.NICKNAMES, `/${RouterService.NICKNAMES_URL}`, 'fas fa-tag'));

        for (let item of [...this.collection]) {
            item.action = item => router.navigate(item.data);
            item.checkSelected = item => router.isUrlActive(item.data, false);
        }
        router.finished.pipe(takeUntil(this.destroyed)).subscribe(() => this.refreshSelection());

        this.complete();
        this.refresh();
    }
}

export class ShellListItem extends SelectListItem<string> {
    constructor(translationId: string, sortIndex: number, url: string, iconId: string, className?: string) {
        super(translationId, sortIndex, url);
        this.iconId = iconId;
        this.className = className;
        this.selectedClassName = 'active';
    }
}
