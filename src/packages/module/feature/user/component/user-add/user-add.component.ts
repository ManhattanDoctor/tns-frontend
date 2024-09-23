import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable, ISignature } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { IUserAddDto } from '@common/hlf/acl/transport';
import { Variables as AclVariables } from '@common/hlf/acl';
import { WalletService } from '@core/service';
import * as _ from 'lodash';

@Component({
    templateUrl: 'user-add.component.html',
})
export class UserAddComponent extends IWindowContent implements ISerializable<IUserAddDto> {
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

    public account: string;
    public accounts: Array<string>;
    public signature: ISignature;
    public inviterUid: string;
    public walletSecond: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService, private wallet: WalletService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.inviterUid = AclVariables.platform.uid;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngOnInit(): void {
        this.loadAccounts();
    }

    public async loadAccounts(): Promise<void> {
        this.accounts = await this.wallet.getAccounts();
        this.account = _.first(this.accounts);
    }

    public serialize(): IUserAddDto {
        return { signature: this.signature, inviterUid: this.inviterUid, wallet: this.walletSecond };
    }

    public async submit(): Promise<void> {
        let nonce = Date.now().toString();
        this.signature = await this.wallet.sign(AclVariables.signature.message(nonce), nonce, this.account);
        await this.windows.question('user.add.confirmation').yesNotPromise;
        this.emit(UserAddComponent.EVENT_SUBMITTED);
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
}
