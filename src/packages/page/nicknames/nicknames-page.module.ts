
import { NgModule } from '@angular/core';
import { NicknamesPageRoutingModule } from './nicknames-page.routing.module';
import { NicknamesPageComponent } from './nicknames-page.component';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [MatProgressBarModule, SharedModule, NicknamesPageRoutingModule,],
    declarations: [NicknamesPageComponent]
})
export default class NicknamesPageModule { }
