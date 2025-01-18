import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './environment-vars';
import { UserInterfaceLog, UserInterfaceReg } from './interfaces/user-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService { // Auth service-са служи за всички необходими деиствия обвързани с упълномощаването

  constructor(private http: HttpClient) {}

  // Връща дали сме логнати
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }

  // Регистрира нов потребител
  regUser(username:string,password:string,email:string,phoneNumber:string) {
    return this.http.post<UserInterfaceReg>(API + "users/register",{
      username,
      password,
      email,
      phoneNumber
    })
  }

  // Логва потребител
  logUser(username:string,password:string){
    return this.http.post<UserInterfaceLog>(API + "users/login",{
      username,
      password
    })
  }

  // Връща ни токена на сегашния логнат потребител
  getToken(){
    return localStorage.getItem("token");
  }


  // Разлогваме потребителя
  unLogUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

}
