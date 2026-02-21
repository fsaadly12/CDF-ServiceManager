import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { MaterialModule } from '../shared/material/material.module';




@NgModule({
  declarations: [
    ClientDashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PagesModule { }
