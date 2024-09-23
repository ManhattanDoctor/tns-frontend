import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { HlfObjectDetailsService, PipeService } from '@core/service';
import { UserAddCommand, UserOpenCommand } from '@feature/user/transport';
import { UserMapCollection, UserTableSettings } from '@core/lib';
import { User } from '@common/platform';
import { UserMenu } from '@feature/user/service';
import { NicknameOpenCommand } from '@feature/nickname/transport';
import * as _ from 'lodash';
import { idText } from 'typescript';

@Component({
    templateUrl: './users-page.component.html'
})
export class UsersPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: UserTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, hlfObject: HlfObjectDetailsService, private transport: Transport, public menu: UserMenu, public items: UserMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-4 pb-3 pt-4 pb-lg-4');

        this.settings = new UserTableSettings(pipe, hlfObject)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public add(): void {
        this.transport.send(new UserAddCommand());
    }

    public async cellClickedHandler(item: ICdkTableCellEvent<User>): Promise<void> {
        if (item.column === 'nickname' && !_.isNil(item.data.nicknameUid)) {
            this.transport.send(new NicknameOpenCommand({ id: item.data.nicknameUid, isBriefly: false }));
            return;
        }

        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new UserOpenCommand({ id: item.data.uid, isBriefly: false }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

}
