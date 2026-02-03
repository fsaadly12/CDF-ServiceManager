import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  editingId: number | null = null;


  constructor(private serviceService: ServiceService,
  private router: Router,
  private snackBar: MatSnackBar
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
      this.resetForm();

      this.snackBar.open('Service added successfully', 'OK', {
        duration: 3000
      });
    },
    error: () => {
      this.snackBar.open('Error adding service', 'Close', {
        duration: 3000
      });
    }
  });
}

deleteService(id: number) {
  if (!confirm('Are you sure?')) return;

  this.serviceService.deleteService(id).subscribe({
    next: () => {
      this.services = this.services.filter(s => s.id !== id);

      this.snackBar.open('Service deleted', 'OK', {
        duration: 3000
      });
    },
    error: () => {
      this.snackBar.open('Error deleting service', 'Close', {
        duration: 3000
      });
    }
  });
}

editService(service: any) {
  this.newService = { ...service };
  this.editingId = service.id;
  this.snackBar.open('Service updated', 'OK', {
  duration: 3000
});

}

saveService() {
  if (this.editingId === null) return;

  this.serviceService
    .updateService(this.editingId, this.newService)
    .subscribe({
      next: () => {
        this.getServices();
        this.resetForm();
      },
      error: (err) => {
        console.error('UPDATE ERROR:', err);
      }
    });
}

resetForm() {
  this.newService = {
    title: '',
    description: '',
    status: 'pending',
    user_id: 1
  };
  this.editingId = null;
}


}
