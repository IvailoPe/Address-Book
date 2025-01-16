import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './environment-vars';
import { UserInterfaceLog, UserInterfaceReg } from './interfaces/user-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }

  regUser(username:string,password:string,email:string,phoneNumber:string) {
    return this.http.post<UserInterfaceReg>(API + "users/register",{
      username,
      password,
      email,
      phoneNumber
    })
  }

  logUser(username:string,password:string){
    return this.http.post<UserInterfaceLog>(API + "users/login",{
      username,
      password
    })
  }

}
