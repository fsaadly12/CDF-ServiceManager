import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmployeeDashboardComponent } from './employee-dashboard.component';

@NgModule({
  declarations: [
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeModule {}
