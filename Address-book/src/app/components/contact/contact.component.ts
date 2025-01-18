import { Component } from '@angular/core';
import { ContactInfoService } from '../../contact-info.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../interfaces/contact-interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private contactServices:ContactInfoService,private route:ActivatedRoute, private router:Router){}

  // Взимаме информацията на контакта и я показваме
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') as string;
    this.contactServices.getSingleUserContact(id).subscribe((data) => {
      this.contactData = data;  
    })
  }

  contactData!:Contact

  // Редиректваме към edit страницата за контакта
  redirectToEdit() {
    let id = this.route.snapshot.paramMap.get('id') as string;
    this.router.navigate(['/contact/edit/' + id]);
  }

  // Изтриваме контакта
  deleteContact(){
    let id = this.route.snapshot.paramMap.get('id') as string;
    this.contactServices.deleteSingleContact(id).subscribe((data) => {
      this.router.navigate(['/home']);
    })
  }
}
