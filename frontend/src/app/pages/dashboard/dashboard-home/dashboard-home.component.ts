import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  
})

export class DashboardHomeComponent implements OnInit {

  services: Service[] = [];
  loading = false;

  newService: Service = {
  title: '',
  description: '',
  status: 'pending',
  user_id: 1
};

  editingId: number | null = null;


  constructor(private serviceService: ServiceService,
  private router: Router,
  private snackBar: MatSnackBar,
  private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.getServices();
  }
  
  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/auth/login']);
}

  getServices() {
  this.loading = true;
  this.serviceService.getServices().subscribe({
    next: (data) => {
      this.services = data;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}


  addService() {
    this.serviceService.addService(this.newService).subscribe({
      next: () => {
        this.snackBar.open('Service added successfully', 'OK', {
          duration: 3000
        });
        this.getServices();
        this.resetForm();
      },
      error: (err) => {
        console.error('ADD ERROR:', err);
      }
    });
  }

deleteService(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: 'Are you sure you want to delete this service?' }
  });

  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (!result) return;

    this.serviceService.deleteService(id).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.id !== id);
        this.snackBar.open('Service deleted', 'OK', { duration: 3000 });
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  });
}


  
  editService(service: any) {
    this.newService = {
      title: service.title,
      description: service.description,
      status: service.status,
      user_id: service.user_id
    };
    this.editingId = service.id;
  }

 
  saveService() {
    if (this.editingId === null) return;

    this.serviceService
      .updateService(this.editingId, this.newService)
      .subscribe({
        next: () => {
          this.snackBar.open('Service updated successfully', 'OK', {
            duration: 3000
          });
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