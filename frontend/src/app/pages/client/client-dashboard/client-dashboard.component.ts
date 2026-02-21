import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html'
})
export class ClientDashboardComponent implements OnInit {

  requests: any[] = [];
  loading = false;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
