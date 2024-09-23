import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknamesPageComponent } from './nicknames-page.component';

const routes: Routes = [{ path: '', component: NicknamesPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NicknamesPageRoutingModule {}
