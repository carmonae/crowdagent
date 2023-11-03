import { Routes } from "@angular/router";
import { LandingModule } from "../../landing/landing.module";

export const content: Routes = [
    {
        path: 'landing',
        data: {
            title: "Landing",
            breadcrumb: "Landing"
        },
        loadChildren: () => import('../../landing/landing.module').then(m => m.LandingModule),
    },
    {
        path: 'users',
        data: {
            title: 'Users',
            breadcrumb: 'Users'
        },
        loadChildren: () => import('../../components/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'dashboard',
        data: {
            title: 'Dashboard',
            breadcrumb: 'Dashboard'
        },
        loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'projects',
        data: {
            title: 'Projects',
            breadcrumb: 'Projects'
        },
        loadChildren: () => import('../../components/project/project.module').then(m => m.ProjectModule)
    },
    {
        path: 'crowdagent',
        data: {
            title: 'CrowdAgent',
            breadcrumb: 'CrowdAgent'
        },
        loadChildren: () => import('../../components/crowdagent/crowdagent.module').then(m => m.CrowdagentModule)
    },

]