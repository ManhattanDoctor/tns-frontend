import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { ISigner, WalletService } from '@core/service';
import { RegExpUtil } from '@common/util';
import * as _ from 'lodash';

@Component({
    templateUrl: 'signer-add.component.html',
})
export class SingerAddComponent extends IWindowContent implements OnInit, ISerializable<ISigner> {
    // --------------------------------------------------------------------------
    //
    //  Constants
    //
    // --------------------------------------------------------------------------

    public static EVENT_ADDED = 'EVENT_ADDED';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public name: string;
    public account: string;
    public accounts: Array<string>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService, private wallet: WalletService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');
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

    public serialize(): ISigner {
        return { uid: this.account, name: this.name };
    }

    public async submit(): Promise<void> {
        await this.windows.question('signer.add.confirmation').yesNotPromise;
        this.emit(SingerAddComponent.EVENT_ADDED);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get accountPattern(): RegExp {
        return RegExpUtil.ETH_ADDRESS_REG_EXP;
    }
}
