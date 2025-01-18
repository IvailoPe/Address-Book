import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactInfoService } from '../../contact-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../interfaces/contact-interfaces';
import {
  addCustomFieldFunct,
  addLabelFucnt,
  addLabelFucntToAlreadyExistingLabels,
} from '../../utilities/upload-utilities';

@Component({
  selector: 'app-contact-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent {
  constructor(
    private contactServices: ContactInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  contactData!: Contact;

  ngAfterViewInit(): void { // Добавяме функционалност към етикетите и персонализираните полета
    addLabelFucnt();
    addCustomFieldFunct();
  }
  
  // Добавяме данните в полетата на конролите
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') as string;
    this.contactServices.getSingleUserContact(id).subscribe((data) => {
      this.contactData = data;
      
      this.editForm.controls.email.setValue(data.email);
      this.editForm.controls.phoneNumber.setValue(data.phoneNumber);
      this.editForm.controls.firstName.setValue(data.firstName);
      this.editForm.controls.familyName.setValue(data.lastName);
      this.editForm.controls.address.setValue(data.address);
      this.editForm.controls.faxNumber.setValue(data.faxNumber);
      this.editForm.controls.firmName.setValue(data.companyName);
      this.editForm.controls.image.setValue(data.image);
      this.editForm.controls.comment.setValue(
        data.comment === undefined ? "" : data.comment
      );
    });
  }

  // Добавяме валидациите за формата както и групата и контролите към групата
  editForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      familyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(5),
      ]),
      faxNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      firmName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3),
      ]),
      image: new FormControl('', [Validators.required,Validators.pattern("^https://.*")]),
      comment: new FormControl('', [Validators.maxLength(500)]),
    },
    { validators: [this.phoneNumberValidator] }
  );

  // Проверява телефоният номер дали е според нашите изисквания такаде да започва с 359
  phoneNumberValidator(control: AbstractControl) {
    let phoneNumber = control.get('phoneNumber')?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);

    if (isPhoneValid) {
      return null;
    }

    return { phoneNumber: true };
  }

  // За 6 те функции от долу правим абсолютно същото както в upload просто по друг начин добавяме функционалносттите на етикетите и на персонализираните полета

  mouseOver(event: MouseEvent) {
    const label = event.currentTarget  as HTMLElement;
    label.style.borderColor = 'black';
  }

  mouseOverField(event: MouseEvent) {
    const field = event.currentTarget  as HTMLElement;

    field.style.backgroundColor = 'red';
  }

  mouseOutField(event: MouseEvent) {
    const field = event.currentTarget  as HTMLElement;

    field.style.backgroundColor = 'white';
  }

  mouseOut(event: MouseEvent) {
    const label = event.currentTarget  as HTMLElement;
    label.style.borderColor = label.style.backgroundColor;
  }

  fieldFunct(event: MouseEvent) {
    const field = event.currentTarget  as HTMLElement;

    let titleInput = document.querySelector('#title') as HTMLInputElement;
    let descriptionInput = document.querySelector(
      '#field-description'
    ) as HTMLInputElement;

    let decision: boolean = confirm('Click ok to edit and cancel to delete');
    if (!decision) {
      field.remove();
    } else {
      titleInput.value = field.querySelector('h3')?.textContent as string;
      descriptionInput.value = field.querySelector('p')?.textContent as string;
      field.remove();
    }
  }

  labelFunc(event: MouseEvent) {
    const label = event.currentTarget as HTMLElement;

    const labelInput: HTMLInputElement = document.querySelector(
      '#upload-details-labels input'
    ) as HTMLInputElement;

    const labelColours = document.querySelectorAll('#color-box div');

    let decision: boolean = confirm('Click ok to edit and cancel to delete');
    if (!decision) {
      label.remove();
    } else {
      labelInput.value = label.textContent?.trim() as string;
      labelColours.forEach((element) => {
        element.classList.remove('selected-label');
      });
      for (const element of labelColours) {
        if (
          element.getAttribute('data-color') === label.style.backgroundColor
        ) {

          element.classList.add('selected-label');
        }
      }
      label.remove();
    }
  }

  
  // Проверяваме и изпращаме данните за актуализация
  onSubmit() {
    const labelsBox = document.querySelector('#upload-details-labels-box');

    if (labelsBox?.children.length === 0) {
      alert('Add atleast one label');
      return;
    }

    const labelsDivs = document.querySelectorAll(
      '#upload-details-labels-box div'
    ) as NodeListOf<HTMLElement>;
    const customFieldsDivs = document.querySelectorAll(
      '#upload-details-custom-fields-box div'
    );

    labelsDivs.forEach((label) => {
      label.setAttribute("data-color",label.style.backgroundColor);
    })

    const labels: { name: string; color: string }[] = [];
    const customFields: { fieldName: string; value: string }[] = [];

    labelsDivs.forEach((label) => {
      let labelColor = label.getAttribute('data-color') as string;
      labels.push({
        name: label.textContent?.trim() as string,
        color: labelColor,
      });
    });

    customFieldsDivs.forEach((field) => {
      let title = field.querySelector('h3')?.textContent?.trim() as string;
      let description = field.querySelector('p')?.textContent?.trim() as string;

      customFields.push({
        fieldName: title,
        value: description,
      });
    });

    const formValues = this.editForm.value;
    let id = this.route.snapshot.paramMap.get('id') as string;
   
    this.contactServices
      .updateSignleContact(
        id as string,
        formValues.firstName?.trim() as string,
        formValues.familyName?.trim() as string,
        formValues.firmName?.trim() as string,
        formValues.address?.trim() as string,
        formValues.phoneNumber as string,
        formValues.email?.trim() as string,
        formValues.faxNumber?.trim() as string,
        formValues.comment?.trim() as string,
        formValues.image?.trim() as string,
        labels,
        customFields
      )
      .subscribe((data) => {
        this.router.navigate(['/contact/' + id]);
      });
    
  }
}
