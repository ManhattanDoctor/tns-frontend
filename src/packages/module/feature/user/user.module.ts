import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserAddHandler } from './transport/handler';
import { UserAddCommand } from './transport';
import { UserAddComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [UserAddComponent];

@NgModule({
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatSelectModule, SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class UserModule extends TransportLazyModule<UserModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'UserModule';
    public static COMMANDS = [UserAddCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<UserModule>, transport: Transport, add: UserAddHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return UserModule.ID;
    }

    public get commands(): Array<string> {
        return UserModule.COMMANDS;
    }
}
