import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NicknamePageRoutingModule } from './nickname-page.routing.module';
import { NicknamePageComponent } from './nickname-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { NicknameModule } from '@feature/nickname';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatMenuModule, SharedModule, NicknamePageRoutingModule, NicknameModule],
    declarations: [NicknamePageComponent]
})
export default class NicknamePageModule { }