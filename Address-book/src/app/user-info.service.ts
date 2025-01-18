import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { profileInterface } from './interfaces/user-interfaces';
import { API } from './environment-vars';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService { // User service-са служи за всички необходими деиствия обвързани с user-рите

  constructor(private http: HttpClient, private authService:AuthService) { }

  // Вземане на информация за един user
  getInfoAboutUser(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.get<profileInterface>(API + "users/profile",{headers})
  }

  // Изтриване на акаунт 
  deleteUser(password:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.post<{message:string}>(API + "users/delete/profile",
    {
      password
    },
    {headers})
  }

  // Ъпдейтване на username на акаунт
  updateUsername(password:string, newUsername:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.put<{message:string}>(API + "users/profile/update-username",{
      password,
      newUsername
    },{headers})
   
  }

  // Ъпдейтване на имейл на акаунт
  updateEmail(password:string, newEmail:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.put<{message:string}>(API + "users/profile/update-email",{
      password,
      newEmail
    },{headers})
   
  }

  // Ъпдейтване на парола на акаунт
  updatePassword(oldPassword:string, newPassword:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.put<{message:string}>(API + "users/profile/update-password",{
      oldPassword,
      newPassword
    },{headers})
   
  }

  // Ъпдейтване на телефонен номер на акаунт
  updatePhone(password:string, newPhoneNumber:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.put<{message:string}>(API + "users/profile/update-phone",{
      password,
      newPhoneNumber
    },{headers})
   
  }
}
