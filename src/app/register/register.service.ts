import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface CreateUserDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  http = inject(HttpClient);

  register(createUserDto: CreateUserDto) {
    return this.http.post(`${environment.api}/auth/register`, {
      ...createUserDto,
    });
  }
}
