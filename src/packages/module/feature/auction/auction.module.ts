import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuctionOpenHandler, AuctionPrimaryAddHandler, AuctionBidHandler, AuctionSecondaryAddHandler } from './transport/handler';
import { AuctionOpenCommand, AuctionPrimaryAddCommand, AuctionBidCommand, AuctionSecondaryAddCommand } from './transport';
import { AuctionContainerComponent, AuctionSecondaryAddComponent, AuctionDetailsComponent, AuctionPrimaryAddComponent, AuctionBidComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [AuctionContainerComponent, AuctionSecondaryAddComponent, AuctionPrimaryAddComponent, AuctionDetailsComponent, AuctionBidComponent];

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
    public static COMMANDS = [AuctionOpenCommand.NAME, AuctionPrimaryAddCommand.NAME, AuctionSecondaryAddCommand.NAME, AuctionBidCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<AuctionModule>, transport: Transport, open: AuctionOpenHandler, primaryAdd: AuctionPrimaryAddHandler, secondaryAdd: AuctionSecondaryAddHandler, bid: AuctionBidHandler) {
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
