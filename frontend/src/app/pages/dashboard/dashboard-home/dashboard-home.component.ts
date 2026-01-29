import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {

  services: any[] = [];

  constructor(private serviceService: ServiceService,
      private router: Router
  ) {}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/auth/login']);
}

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
