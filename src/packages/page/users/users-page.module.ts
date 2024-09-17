import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersPageRoutingModule } from './users-page.routing.module';
import { UsersPageComponent } from './users-page.component';
import { MatButtonModule } from '@angular/material/button';
import { UserModule } from '@feature/user';
import { SharedModule } from '@shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatMenuModule, SharedModule, UsersPageRoutingModule, UserModule],
    declarations: [UsersPageComponent]
})
export class UsersPageModule { }