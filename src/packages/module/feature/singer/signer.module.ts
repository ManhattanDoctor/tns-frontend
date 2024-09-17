import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SingerAddHandler } from './transport/handler';
import { SingerAddCommand } from './transport';
import { SingerInfoComponent, SingerAddComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [SingerInfoComponent, SingerAddComponent];

@NgModule({
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatSelectModule, SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class SignerModule extends TransportLazyModule<SignerModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'SignerModule';
    public static COMMANDS = [SingerAddCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<SignerModule>, transport: Transport, add: SingerAddHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return SignerModule.ID;
    }

    public get commands(): Array<string> {
        return SignerModule.COMMANDS;
    }
}
