import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionPageComponent } from './auction-page.component';

const routes: Routes = [{ path: '', component: AuctionPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuctionPageRoutingModule { }
