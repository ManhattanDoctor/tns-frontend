
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VIMatModule } from '@ts-core/angular-material';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CoinAmountPipe, CoinIdPipe, RolePipe } from './pipe';
import { PictureGravatarDirective } from './directive';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionsComponent, FinanceActionsComponent, CoinBalancesComponent } from './component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const imports = [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,

    VIMatModule,
];


const declarations = [
    RolePipe,
    CoinIdPipe,
    CoinAmountPipe,

    PictureGravatarDirective,

    ActionsComponent,
    FinanceActionsComponent,
    CoinBalancesComponent
];

@NgModule({
    imports: [...imports],
    exports: [...imports, ...declarations],
    declarations,
    providers
})
export class SharedModule { }
