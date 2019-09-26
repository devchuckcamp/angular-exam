import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserComponent } from './dashboard/user/user.component';
import { UserDetailComponent } from './dashboard/user/user-detail/user-detail.component';

const routes:   Routes = [
    {
        path: '',
        redirectTo:'dashboard',
        pathMatch:'full',
    },
    {
        path: 'dashboard', component:UserComponent
    },
    {
        path: 'dashboard/user/:user_id', component:UserDetailComponent
    },
];

@NgModule({
    imports:[RouterModule.forRoot(
        routes, { useHash: false }
        // { enableTracing: true }
        )],
    exports:[RouterModule],
})
export class AppRoutingModule{}