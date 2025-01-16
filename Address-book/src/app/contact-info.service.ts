import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './environment-vars';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private http: HttpClient) { }

  uploadContact(formData:FormData){
    
  }
}
