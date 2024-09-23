import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { RegExpUtil } from '@common/util';
import { INicknameTransferDto } from '@common/hlf/auction/transport';
import * as _ from 'lodash';

@Component({
    templateUrl: 'nickname-transfer.component.html',
})
export class NicknameTransferComponent extends IWindowContent implements ISerializable<INicknameTransferDto> {
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

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): INicknameTransferDto {
        return { to: this.to };
    }

    public async submit(): Promise<void> {
        await this.windows.question('nickname.transfer.confirmation').yesNotPromise;
        this.emit(NicknameTransferComponent.EVENT_SUBMITTED);
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
