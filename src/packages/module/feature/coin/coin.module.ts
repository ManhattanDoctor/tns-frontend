import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TransportLazyModule } from '@ts-core/angular';
import { CoinOpenHandler, CoinTransferHandler } from './transport/handler';
import { Transport } from '@ts-core/common';
import { CoinOpenCommand, CoinTransferCommand, } from './transport';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CoinContainerComponent, CoinTransferComponent, CoinDetailsComponent, CoinsComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [CoinContainerComponent, CoinTransferComponent, CoinDetailsComponent, CoinsComponent];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatExpansionModule,
        MatMenuModule,
        MatProgressBarModule,
        MatDatepickerModule,
        SharedModule
    ],
    exports: declarations,
    declarations,
    providers
})
export class CoinModule extends TransportLazyModule<CoinModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'CoinModule';
    public static COMMANDS = [CoinOpenCommand.NAME, CoinTransferCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        reference: NgModuleRef<CoinModule>,
        transport: Transport,
        open: CoinOpenHandler,
        transfer: CoinTransferHandler,
    ) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return CoinModule.ID;
    }

    public get commands(): Array<string> {
        return CoinModule.COMMANDS;
    }
}
