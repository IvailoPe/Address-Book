import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from './environment-vars';
import { Contact } from './interfaces/contact-interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {  // Контакт service-са служи за всички необходими деиствия обвързани с контактите

  constructor(private http: HttpClient, private authService:AuthService) { }

  // Качване на контакти
  uploadContact(firstName:string,lastName:string,companyName:string,address:string,phoneNumber:string,email:string,faxNumber:string,comment:string, image:string,labels:{ name: string; color: string }[],customFields:{ fieldName: string; value: string }[]){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });
    
    return this.http.post<Contact>(API + "contacts",{
      firstName:firstName,
      lastName:lastName,
      companyName:companyName,
      address:address,
      phoneNumber:phoneNumber,
      email:email,
      faxNumber:faxNumber,
      comment:comment,
      image:image,
      labels:labels,
      customFields:customFields
    }, { headers })
  }

  // Взимане на всички контакти на един user
  getAllUserContacts(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });
    
    return this.http.get<Contact[]>(API + "contacts", {headers})
  }

  // Взимане на един контакт на един user
  getSingleUserContact(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });
    
    return this.http.get<Contact>(API + "contacts/" + id,{headers})
  }

  // Изтриване на един контакт на един user
  deleteSingleContact(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });
    
    return this.http.delete<Contact>(API + "contacts/" + id,{headers})
  }

  // Update-ване на един контакт на един user
  updateSignleContact(id:string,firstName:string,lastName:string,companyName:string,address:string,phoneNumber:string,email:string,faxNumber:string,comment:string, image:string,labels:{ name: string; color: string }[],customFields:{ fieldName: string; value: string }[]){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.put<Contact>(API + "contacts/" + id, {
      firstName:firstName,
      lastName:lastName,
      companyName:companyName,
      address:address,
      phoneNumber:phoneNumber,
      email:email,
      faxNumber:faxNumber,
      comment:comment,
      image:image,
      labels:labels,
      customFields:customFields
    }, {headers})
  }
}
