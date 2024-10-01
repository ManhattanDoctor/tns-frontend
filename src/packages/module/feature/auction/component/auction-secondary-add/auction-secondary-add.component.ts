import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { AuctionAddConditionsGetCommand, IAuctionSecondaryAddDto } from '@common/hlf/auction/transport';
import { ApiService, PipeService, SignerService } from '@core/service';
import { Variables as AuctionVariables } from '@common/hlf/auction';
import * as _ from 'lodash';

@Component({
    templateUrl: 'auction-secondary-add.component.html',
})
export class AuctionSecondaryAddComponent extends IWindowContent implements ISerializable<IAuctionSecondaryAddDto> {
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

    public price: number;

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
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): IAuctionSecondaryAddDto {
        return { price: this.price.toString() };
    }

    public async check(): Promise<void> {
        let item = await this.api.hlf.ledgerRequestSendListen(new AuctionAddConditionsGetCommand({ userUid: this.signer.userId, price: this.price.toString() }));
        console.log(item);
        this.windows.info(JSON.stringify(item, null, 4));
    }

    public async submit(): Promise<void> {
        await this.windows.question('auction.add.confirmation').yesNotPromise;
        this.emit(AuctionSecondaryAddComponent.EVENT_SUBMITTED);
    }
}
