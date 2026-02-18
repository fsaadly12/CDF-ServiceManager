import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';



@NgModule({
  declarations: [
    ClientDashboardComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
