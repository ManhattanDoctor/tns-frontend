import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { ICoinTransferDto } from '@common/hlf/auction/transport';
import { Variables as AuctionVariables } from '@common/hlf/auction';
import * as _ from 'lodash';

@Component({
    templateUrl: 'coin-transfer.component.html',
})
export class CoinTransferComponent extends IWindowContent implements ISerializable<ICoinTransferDto> {
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

    public to: string;
    public amount: number;
    public coinUid: string;

    public accounts: Array<string>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.amount = 1000;
        this.coinUid = AuctionVariables.coin.uid;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): ICoinTransferDto {
        return { to: this.to, amount: this.amount.toString(), coinUid: this.coinUid };
    }

    public async submit(): Promise<void> {
        await this.windows.question('coin.transfer.confirmation').yesNotPromise;
        this.emit(CoinTransferComponent.EVENT_SUBMITTED);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get uidPattern(): RegExp {
        return RegExpUtil.USER_UID_REG_EXP;
    }
}
