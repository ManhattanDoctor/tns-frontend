import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknamePageComponent } from './nickname-page.component';

const routes: Routes = [{ path: '', component: NicknamePageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class NicknamePageRoutingModule { }
