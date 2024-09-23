
import { NgModule } from '@angular/core';
import { UsersPageRoutingModule } from './users-page.routing.module';
import { UsersPageComponent } from './users-page.component';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [MatProgressBarModule, SharedModule, UsersPageRoutingModule,],
    declarations: [UsersPageComponent]
})
export default class UsersPageModule { }
