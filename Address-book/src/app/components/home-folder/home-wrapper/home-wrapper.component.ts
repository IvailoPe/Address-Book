import { Component, OnInit, HostBinding } from '@angular/core';
import { HomeContactComponent } from '../home-contact/home-contact.component';
import { ContactInfoService } from '../../../contact-info.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../interfaces/contact-interfaces';

@Component({
  selector: 'app-home-wrapper',
  imports: [HomeContactComponent,CommonModule],
  templateUrl: './home-wrapper.component.html',
  styleUrl: './home-wrapper.component.css'
})
export class HomeWrapperComponent {
  constructor(private contactServices:ContactInfoService){}

  contactsData!:Contact[];

  // Иерхична построика на цветовете
  colorHierarchy = [
    'rgb(255, 192, 203)',
    'rgb(255, 255, 0)',
    'rgb(255, 165, 0)',
    'rgb(192, 192, 192)',
    'rgb(173, 255, 47)',
    'rgb(128, 0, 128)',
    'rgb(45, 45, 219)',
    'rgb(255, 215, 0)',
    'rgb(255, 0, 0)'
  ];

  @HostBinding('style.width') get hostWidth() {
    return this.contactsData?.length === 0 ? '100%' : '';
  }

  @HostBinding('style.height') get hostHeight() {
    return this.contactsData?.length === 0 ? '100%' : '';
  }

  @HostBinding('class.no-contacts') get noContacts() {
    return this.contactsData?.length === 0;
  }

  // Взимаме всички контакти на потребителя и ги сортираме по цветовете на етикетите им като цветовете от долу на горе имат най много точки тоест от 8 до 1 след това се събират и се правят проверки
  ngOnInit(): void {
    this.contactServices.getAllUserContacts().subscribe((data) => {

       data.sort((a, b) => {        
        let totalPointsOfA = a.labels.reduce((total:number,currentValue:{ name: string; color: string }) => {
          return total += this.colorHierarchy.indexOf(currentValue.color) + 1;
        },0)

        let totalPointsOfB = b.labels.reduce((total:number,currentValue:{ name: string; color: string }) => {
          return total += this.colorHierarchy.indexOf(currentValue.color) + 1;
        },0)
        
        if(totalPointsOfA > totalPointsOfB){
          return -1
        }
        else if(totalPointsOfA < totalPointsOfB){
          return 1
        }
        else{
          return 0
        }
        });

       this.contactsData = data;
    })
  }
}
