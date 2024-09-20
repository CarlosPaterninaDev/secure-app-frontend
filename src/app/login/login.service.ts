import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../home/hashing/hashing.service';


interface UserDto {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  

  login(userDto: UserDto) : Observable<User> {
    return this.http.post<User>(`${environment.api}/auth/login`, { ...userDto });
  }

}
