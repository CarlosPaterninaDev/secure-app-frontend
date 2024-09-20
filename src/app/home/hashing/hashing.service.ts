import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  isActive: boolean;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HashingService {
  http = inject(HttpClient);

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/auth/all`);
  }

  generateFileWithUsers(): Observable<Blob> {
    return this.http.get(`${environment.api}/auth/all`, {
      responseType: 'blob',
    });
  }
}
