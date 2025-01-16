import { Component } from '@angular/core';
import {
  addCustomFieldFunct,
  addLabelFucnt,
} from '../../utilities/upload-utilities';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  ngAfterViewInit(): void {
    addLabelFucnt();
    addCustomFieldFunct();
  }

  updateForm = new FormGroup(
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
      comment: new FormControl('', [Validators.maxLength(500)]),
    },
    { validators: [this.phoneNumberValidator] }
  );

  phoneNumberValidator(control: AbstractControl) {
    let phoneNumber = control.get('phoneNumber')?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);

    if (isPhoneValid) {
      return null;
    }

    return { phoneNumber: true };
  }

  onSubmit() {
    const formData = new FormData();

    Object.keys(this.updateForm.controls).forEach((key) => {
      formData.append(key, this.updateForm.get(key)?.value);
    });

    const labelsBox = document.querySelector('#upload-details-labels-box');

    if (labelsBox?.children.length === 0) {
      alert('Add atleast one label');
      return;
    }

    const labelsDivs = document.querySelectorAll(
      '#upload-details-labels-box div'
    );
    const customFieldsDivs = document.querySelectorAll(
      '#upload-details-custom-fields-box div'
    );

    const labels: { name: string; color: string }[] = [];
    const customFields: { fieldName: string; value: string }[] = [];

    labelsDivs.forEach((label) => {
      let labelColor = label.getAttribute('data-color') as string;
      labels.push({
        name: label.textContent as string,
        color: labelColor,
      });
    });

    customFieldsDivs.forEach((field) => {
      let title = field.querySelector('h3')?.textContent as string;
      let description = field.querySelector('p')?.textContent as string;

      customFields.push({
        fieldName: title,
        value: description,
      });
    });

    formData.append("labels",JSON.stringify(labels));
    formData.append("customFields",JSON.stringify(customFieldsDivs));

    

  }
}
