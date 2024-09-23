import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuctionOpenHandler } from './transport/handler';
import { AuctionOpenCommand } from './transport';
import { AuctionContainerComponent, AuctionDetailsComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [AuctionContainerComponent, AuctionDetailsComponent];

@NgModule({
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatProgressBarModule, MatSelectModule, SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class AuctionModule extends TransportLazyModule<AuctionModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'AuctionModule';
    public static COMMANDS = [AuctionOpenCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<AuctionModule>, transport: Transport, open: AuctionOpenHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return AuctionModule.ID;
    }

    public get commands(): Array<string> {
        return AuctionModule.COMMANDS;
    }
}
