import { Component, Input,OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from '../../../interfaces/contact-interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-contact',
  imports: [CommonModule,RouterModule],
  templateUrl: './home-contact.component.html',
  styleUrl: './home-contact.component.css'
})
export class HomeContactComponent {
  @Input() data!: Contact;

  date!:Date

  // Взимаме датата и изменяме видът и да се показват само ден месец и година
  ngOnChanges(changes: SimpleChanges): void {
    this.date = new Date(this.data.createdAt)
  }
}
