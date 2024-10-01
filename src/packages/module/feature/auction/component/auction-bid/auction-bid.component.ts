import { Component, Input, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { ICoinAmount } from '@hlf-core/common';
import { AuctionBidConditionsGetCommand, IAuctionBidDto } from '@common/hlf/auction/transport';
import { ApiService, SignerService } from '@core/service';
import { IsAuction } from '@common/hlf';
import * as _ from 'lodash';

@Component({
    templateUrl: 'auction-bid.component.html',
})
export class AuctionBidComponent extends IWindowContent implements ISerializable<IAuctionBidDto> {
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

    public amount: ICoinAmount;
    private _auctionUid: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService, private signer: SignerService, private api: ApiService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private async commitAuctionUidProperties(): Promise<void> {
        if (!IsAuction(this.auctionUid)) {
            this.amount = null;
            return;
        }
        try {
            this.amount = await this.api.hlf.ledgerRequestSendListen(new AuctionBidConditionsGetCommand({ uid: this.auctionUid, userUid: this.signer.userId }));
        }
        catch (error) {
            this.amount = null;
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): IAuctionBidDto {
        return { uid: this.auctionUid };
    }

    public async submit(): Promise<void> {
        await this.windows.question('auction.bid.confirmation').yesNotPromise;
        this.emit(AuctionBidComponent.EVENT_SUBMITTED);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get auctionUid(): string {
        return this._auctionUid;
    }
    public set auctionUid(value: string) {
        if (value === this._auctionUid) {
            return;
        }
        this._auctionUid = value;
        if (!_.isNil(value)) {
            this.commitAuctionUidProperties();
        }
    }

    public get auctionUidPattern(): RegExp {
        return RegExpUtil.AUCTION_UID_REG_EXP;
    }
}
