import { Component } from '@angular/core';
import { FilterService } from '../../filter.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../interfaces/contact-interfaces';
import {FormControl,FormGroup,Validators,} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  constructor(private filterServices:FilterService){}

  contactsData!:Contact[]

  // Добавяме валидациите за формата както и групата и контролите към групата
  searchForm = new FormGroup({
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",Validators.required)
  })

  // Взимаме всички контакти
  getAllRecoords(){
    this.filterServices.getAllContacts().subscribe((data) => {
      this.contactsData = data;
    })
  }

  // Взимаме контактите с най-попюлярни етикети
  getAllFrequentTags(){
    this.filterServices.getAllFrequentLabels().subscribe((data) => {
      this.contactsData = data;
    })
  }

  // Взимаме контактите с еднакви първи имена и различни фамилии
  getAllContactsWithSameFnames(){
    this.filterServices.getAllSameFNameAndDiffentLName().subscribe((data) => {
      this.contactsData = data.flat();
    })
  }

  // Взимаме контактите с еднакви фамилии и различни първи имена
  getAllContactsWithSameLnames(){
    this.filterServices.getAllDifferentFNameAndSameLName().subscribe((data) => {
      this.contactsData = data.flat();
    })
  }

  // Взимане на специфичен контакт с специфични име и фамилия
  onSubmit(){
    const formValues = this.searchForm.value;

    this.filterServices.getSpecificContact(formValues.firstName as string,formValues.lastName as string).subscribe((data) => {
      this.contactsData = data;
    })
  }
}
