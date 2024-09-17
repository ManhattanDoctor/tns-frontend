import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShellPageRoutingModule } from './shell-page.routing.module';
import { ShellPageComponent } from './shell-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ShellHeaderComponent } from './component/shell-header/shell-header.component';
import { ShellMenu } from './service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '@shared/shared.module';
import { SignerModule } from '@feature/singer';

@NgModule({
    imports: [
        CommonModule,
        ScrollingModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        ShellPageRoutingModule,
        SignerModule,
        SharedModule
    ],
    declarations: [ShellPageComponent, ShellHeaderComponent],
    providers: [ShellMenu]
})
export default class ShellPageModule {}
