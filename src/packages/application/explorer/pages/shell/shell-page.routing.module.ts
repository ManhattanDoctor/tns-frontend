import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
    {
        path: '',
        component: ShellPageComponent,
        children: [
            {
                path: '',
                redirectTo: RouterService.USERS_URL
            },
            /*
            {
                path: RouterService.USERS_URL,
                loadChildren: async () => (await import('@page/users/users-page.module')).UsersPageModule
            },
            {
                path: `${RouterService.USER_URL}/:uid`,
                resolve: { user: UserResolver },
                loadChildren: async () => (await import('@page/user/user-page.module')).UserPageModule
            },
            {
                path: RouterService.COMPANIES_URL,
                loadChildren: async () => (await import('@page/companies/companies-page.module')).СompaniesPageModule
            },
            {
                path: `${RouterService.COMPANY_URL}/:uid`,
                resolve: { company: CompanyResolver },
                loadChildren: async () => (await import('@page/company/company-page.module')).CompanyPageModule
            },
            {
                path: RouterService.PROJECTS_URL,
                loadChildren: async () => (await import('@page/projects/projects-page.module')).ProjectsPageModule
            },
            {
                path: `${RouterService.PROJECT_URL}/:uid`,
                resolve: { project: ProjectResolver },
                loadChildren: async () => (await import('@page/project/project-page.module')).ProjectPageModule
            },
            */
            { path: '**', redirectTo: RouterService.USERS_URL }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellPageRoutingModule { }
