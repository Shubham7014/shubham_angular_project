import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globals } from './globals';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'https://api.evitalrx.in/v1/fulfillment/medicines/search';
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';
  constructor(private http: HttpClient) { }

  searchMedicine(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });
    const params = new HttpParams().set('query', query);

    return this.http.get(`${this.apiUrl}/medicines`, { headers, params });
  }

//   searchMedicine(query: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}?query=${query}`);
//   }
}
