import { Component, ViewContainerRef } from '@angular/core';
import { DateUtil, ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { ICoinAmount } from '@hlf-core/common';
import { AuctionAddConditionsGetCommand, IAuctionPrimaryAddDto } from '@common/hlf/auction/transport';
import { ApiService, SignerService } from '@core/service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Component({
    templateUrl: 'auction-primary-add.component.html',
})
export class AuctionPrimaryAddComponent extends IWindowContent implements ISerializable<IAuctionPrimaryAddDto> {
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

    private _nickname: string;
    private nicknameChanged: Subject<void>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService, private api: ApiService, private signer: SignerService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.nicknameChanged = new Subject();
        this.nicknameChanged.pipe(debounceTime(DateUtil.MILLISECONDS_SECOND), takeUntil(this.destroyed)).subscribe(this.check);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): IAuctionPrimaryAddDto {
        return { userUid: this.signer.userId, nickname: this.nickname };
    }

    public check = async (): Promise<void> => {
        let { price } = await this.api.hlf.ledgerRequestSendListen(new AuctionAddConditionsGetCommand({ userUid: this.signer.userId, nickname: this.nickname }));
        this.amount = price;
    }

    public async submit(): Promise<void> {
        await this.windows.question('auction.add.confirmation').yesNotPromise;
        this.emit(AuctionPrimaryAddComponent.EVENT_SUBMITTED);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get nicknamePattern(): RegExp {
        return RegExpUtil.NICKNAME_REG_EXP;
    }

    public get nickname(): string {
        return this._nickname;
    }
    public set nickname(value: string) {
        if (value === this._nickname) {
            return;
        }
        this._nickname = value;
        this.nicknameChanged.next();
    }
}
