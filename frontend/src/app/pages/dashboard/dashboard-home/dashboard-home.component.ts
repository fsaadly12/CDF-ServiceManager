import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {

  services: any[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        console.log('DATA FROM API:', data);   // 👈 مهم
        this.services = data;
      },
      error: (err) => {
        console.error('API ERROR:', err);
      }
    });
  }
}
