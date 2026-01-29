import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {

  services: any[] = [];

  newService = {
    title: '',
    description: '',
    status: 'pending',
    user_id: 1
  };

  constructor(private serviceService: ServiceService,
  private router: Router
  ) {}

  ngOnInit(): void {
    this.getServices();
  }
  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/auth/login']);
}

  getServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.error('API ERROR:', err);
      }
    });
  }

  addService() {
    this.serviceService.addService(this.newService).subscribe({
      next: () => {
        this.getServices();
        this.newService = {
          title: '',
          description: '',
          status: 'pending',
          user_id: 1
        };
      },
      error: (err) => {
        console.error('ADD ERROR:', err);
      }
    });
  }
  deleteService(id: number) {
  if (!confirm('Are you sure you want to delete this service?')) {
    return;
  }

  this.serviceService.deleteService(id).subscribe({
    next: () => {
      this.services = this.services.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error('Delete error:', err);
    }
  });
}

}
