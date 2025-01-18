import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Contact } from './interfaces/contact-interfaces';
import { API } from './environment-vars';

@Injectable({
  providedIn: 'root'
})
export class FilterService { // Filter service-са служи за всички необходими деиствия обвързани с филтрирането на контакти

  constructor(private http: HttpClient, private authService:AuthService) { }

  // Взимаме всички контакти
  getAllContacts(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.get<Contact[]>(API + "filter/all",{headers})
  }

  // Взимаме контактите с най-попюлярни етикети
  getAllFrequentLabels(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.get<Contact[]>(API + "filter/popular-labels",{headers})
  }

  // Взимаме контактите с еднакви първи имена и различни фамилии
  getAllSameFNameAndDiffentLName(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.get<Contact[]>(API + "filter/same-first-names",{headers})
  }

  // Взимаме контактите с еднакви фамилии и различни първи имена
  getAllDifferentFNameAndSameLName(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.get<Contact[]>(API + "filter/same-last-names",{headers})
  }

  // Взимане на специфичен контакт с специфични име и фамилия
  getSpecificContact(firstName:string,lastName:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}` as string,
    });

    return this.http.post<Contact[]>(API + "filter/search",
    {
      firstName,
      lastName
    },  
    {headers})
  }
}
