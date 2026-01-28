import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from '../app//pages/dashboard/dashboard-home/dashboard-home.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
 {
  path: 'dashboard',
  loadChildren: () =>
    import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
},
 { path: '', component: DashboardHomeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
