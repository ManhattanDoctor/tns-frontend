
import { NgModule } from '@angular/core';
import { AuctionsPageRoutingModule } from './auctions-page.routing.module';
import { AuctionsPageComponent } from './auctions-page.component';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [MatProgressBarModule, SharedModule, AuctionsPageRoutingModule,],
    declarations: [AuctionsPageComponent]
})
export default class AuctionsPageModule { }
