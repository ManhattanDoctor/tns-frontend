import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { ShellPageComponent } from './shell-page.component';
import { UserResolver } from '@feature/user/guard';
import { CoinResolver } from '@feature/coin/guard';
import { NicknameResolver } from '@feature/nickname/guard';

const routes: Routes = [
    {
        path: '',
        component: ShellPageComponent,
        children: [
            {
                path: '',
                redirectTo: RouterService.USERS_URL
            },
            {
                path: RouterService.USERS_URL,
                loadChildren: () => import('@page/users/users-page.module')
            },
            {
                path: RouterService.NICKNAMES_URL,
                loadChildren: () => import('@page/nicknames/nicknames-page.module')
            },
            {
                path: `${RouterService.USER_URL}/:id`,
                resolve: { user: UserResolver },
                loadChildren: () => import('@page/user/user-page.module')
            },
            {
                path: `${RouterService.NICKNAME_URL}/:id`,
                resolve: { nickname: NicknameResolver },
                loadChildren: () => import('@page/nickname/nickname-page.module')
            },
            { path: '**', redirectTo: RouterService.USERS_URL }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellPageRoutingModule { }
