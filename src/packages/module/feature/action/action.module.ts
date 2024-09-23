import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [];

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatMenuModule,
        MatProgressBarModule,
        SharedModule
    ],
    exports: declarations,
    declarations,
    providers
})
export class ActionModule extends TransportLazyModule<ActionModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'ActionModule';
    public static COMMANDS = [];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<ActionModule>, transport: Transport) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return ActionModule.ID;
    }

    public get commands(): Array<string> {
        return ActionModule.COMMANDS;
    }
}
