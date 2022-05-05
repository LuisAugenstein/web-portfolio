import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@dnd-history/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private url = environment.production ? '' : 'http://localhost:3333/api/';

  constructor(private http: HttpClient){}

  get<T>(endpoint: string) {
    return this.http.get<T>(this.url + endpoint);
  }

  post(endpoint: string, body: any){
    return this.http.post(this.url + endpoint, body);
  }
  
}
