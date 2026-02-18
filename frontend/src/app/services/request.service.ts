import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient) {}

  getMyRequests() {
    return this.http.get<any[]>(`${this.apiUrl}/my-requests`);
  }

  createRequest(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getAllRequests() {
  return this.http.get<any[]>('http://localhost:3000/api/requests/all');
}
setPrice(id: number, price: number) {
  return this.http.put(
    `http://localhost:3000/api/requests/${id}/price`,
    { price }
  );
}

}
