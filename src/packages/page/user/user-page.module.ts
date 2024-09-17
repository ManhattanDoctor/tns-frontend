import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPageRoutingModule } from './user-page.routing.module';
import { UserPageComponent } from './user-page.component';
import { MatButtonModule } from '@angular/material/button';
import { UserModule } from '@feature/user';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, UserPageRoutingModule, UserModule],
    declarations: [UserPageComponent]
})
export class UserPageModule {}