import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { NicknameOpenCommand } from '@feature/nickname/transport';
import { NicknameMapCollection, NicknameTableSettings } from '@core/lib';
import { Nickname } from '@common/platform';
import { NicknameMenu } from '@feature/nickname/service';
import { UserOpenCommand } from '@feature/user/transport';
import * as _ from 'lodash';

@Component({
    templateUrl: './nicknames-page.component.html'
})
export class NicknamesPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: NicknameTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, hlfObject: HlfObjectDetailsService, private transport: Transport, public menu: NicknameMenu, public items: NicknameMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-4 pb-3 pt-4 pb-lg-4');

        this.settings = new NicknameTableSettings(pipe, hlfObject)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Nickname>): Promise<void> {
        if (item.column === 'parentUid' && !_.isNil(item.data.parentUid)) {
            this.transport.send(new NicknameOpenCommand({ id: item.data.parentUid, isBriefly: false }));
            return;
        }
        if (item.column === 'ownerUid' && !_.isNil(item.data.ownerUid)) {
            this.transport.send(new UserOpenCommand({ id: item.data.ownerUid, isBriefly: false }));
            return;
        }

        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new NicknameOpenCommand({ id: item.data.uid, isBriefly: false }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

}
