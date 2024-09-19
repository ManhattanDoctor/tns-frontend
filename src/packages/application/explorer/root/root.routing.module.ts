import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';
import { LanguageResolver } from '@ts-core/angular';

const routes: Routes = [
    {
        path: '',
        resolve: {
            language: LanguageResolver,
        },
        loadChildren: () => import('../pages/shell/shell-page.module')
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'top', preloadingStrategy: NoPreloading, enableTracing: false })],
    exports: [RouterModule]
})
export class RootRoutingModule { }

