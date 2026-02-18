import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { EmployeeDashboardComponent } from './employee-dashboard.component';

@NgModule({
  declarations: [
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule

  ]
})
export class EmployeeModule {}
