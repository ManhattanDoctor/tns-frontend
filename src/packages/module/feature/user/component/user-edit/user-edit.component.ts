import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { IUserEditDto, UserGetCommand } from '@common/hlf/acl/transport';
import { UserRole, UserStatus } from '@common/hlf/acl';
import { ApiService } from '@core/service';
import { IsUser } from '@common/hlf';
import * as _ from 'lodash';

@Component({
    templateUrl: 'user-edit.component.html',
})
export class UserEditComponent extends IWindowContent implements ISerializable<IUserEditDto> {
    // --------------------------------------------------------------------------
    //
    //  Constants
    //
    // --------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _userUid: string;

    public roles: Array<UserRole>;
    public wallet: string;
    public status: UserStatus;
    public rolesAll: Array<UserRole>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService, private api: ApiService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.roles = new Array();
        this.rolesAll = Object.values(UserRole);
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private async commitUserUidProperties(): Promise<void> {
        if (!IsUser(this.userUid)) {
            this.roles = new Array();
            this.wallet = null;
            this.status = null;
            return;
        }
        let { roles, wallet, status } = await this.api.hlf.ledgerRequestSendListen(new UserGetCommand({ uid: this.userUid }));
        this.roles = !_.isEmpty(roles) ? roles : new Array();
        this.wallet = wallet;
        this.status = status;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): IUserEditDto {
        return { uid: this.userUid, roles: this.roles, status: this.status, wallet: this.wallet };
    }

    public async submit(): Promise<void> {
        await this.windows.question('user.edit.confirmation').yesNotPromise;
        this.emit(UserEditComponent.EVENT_SUBMITTED);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get uidPattern(): RegExp {
        return RegExpUtil.USER_UID_REG_EXP;
    }

    public get addressPattern(): RegExp {
        return RegExpUtil.ETH_ADDRESS_REG_EXP;
    }

    public get userUid(): string {
        return this._userUid;
    }
    public set userUid(value: string) {
        if (value === this._userUid) {
            return;
        }
        this._userUid = value;
        this.commitUserUidProperties();
    }
}
