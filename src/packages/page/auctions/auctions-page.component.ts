import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { AuctionOpenCommand } from '@feature/auction/transport';
import { AuctionMapCollection, AuctionTableSettings } from '@core/lib';
import { Auction } from '@common/platform';
import { AuctionMenu } from '@feature/auction/service';
import { UserOpenCommand } from '@feature/user/transport';
import { NicknameOpenCommand } from '@feature/nickname/transport';
import * as _ from 'lodash';

@Component({
    templateUrl: './auctions-page.component.html'
})
export class AuctionsPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: AuctionTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, hlfObject: HlfObjectDetailsService, private transport: Transport, public menu: AuctionMenu, public items: AuctionMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-4 pb-3 pt-4 pb-lg-4');

        this.settings = new AuctionTableSettings(pipe, hlfObject)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Auction>): Promise<void> {
        if (item.column === 'parentUid' && !_.isNil(item.data.parentUid)) {
            this.transport.send(new NicknameOpenCommand({ id: item.data.parentUid, isBriefly: false }));
            return;
        }
        if (item.column === 'initiatorUid' && !_.isNil(item.data.initiatorUid)) {
            this.transport.send(new UserOpenCommand({ id: item.data.initiatorUid, isBriefly: false }));
            return;
        }
        if (item.column === 'bidderUid' && !_.isNil(item.data.bidderUid)) {
            this.transport.send(new UserOpenCommand({ id: item.data.bidderUid, isBriefly: false }));
            return;
        }

        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new AuctionOpenCommand({ id: item.data.uid, isBriefly: false }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

}
