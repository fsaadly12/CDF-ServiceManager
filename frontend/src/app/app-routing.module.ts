import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { ClientDashboardComponent } from './pages/client/client-dashboard/client-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

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
 { path: '', component: DashboardHomeComponent },
 {
  path: 'dashboard',
  component: DashboardHomeComponent,
  canActivate: [AuthGuard],
  data: { roles: ['admin', 'employee'] }
},
{
  path: 'client',
  component: ClientDashboardComponent,
  canActivate: [AuthGuard],
  data: { roles: ['client'] }
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
