import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuctionPageRoutingModule } from './auction-page.routing.module';
import { AuctionPageComponent } from './auction-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { AuctionModule } from '@feature/auction';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatMenuModule, SharedModule, AuctionPageRoutingModule, AuctionModule],
    declarations: [AuctionPageComponent]
})
export default class AuctionPageModule { }