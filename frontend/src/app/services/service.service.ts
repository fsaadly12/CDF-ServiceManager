import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addService(service: any): Observable<any> {
  return this.http.post(this.apiUrl, service);
}
deleteService(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}
