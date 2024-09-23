import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NicknameOpenHandler } from './transport/handler';
import { NicknameOpenCommand } from './transport';
import { NicknameContainerComponent, NicknameDetailsComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [NicknameContainerComponent, NicknameDetailsComponent];

@NgModule({
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatProgressBarModule, MatSelectModule, SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class NicknameModule extends TransportLazyModule<NicknameModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'NicknameModule';
    public static COMMANDS = [NicknameOpenCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<NicknameModule>, transport: Transport, open: NicknameOpenHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return NicknameModule.ID;
    }

    public get commands(): Array<string> {
        return NicknameModule.COMMANDS;
    }
}
