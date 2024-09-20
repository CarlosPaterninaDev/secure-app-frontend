
import { Injectable } from '@angular/core';


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
export class EncryptionService {

}
