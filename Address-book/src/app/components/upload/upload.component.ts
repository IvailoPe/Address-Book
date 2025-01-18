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
import { ContactInfoService } from '../../contact-info.service';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contact-interfaces';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  ngAfterViewInit(): void {   // Добавяме функционалност към етикетите и персонализираните полета
    addLabelFucnt();
    addCustomFieldFunct();
  }
  
  // Добавяме валидациите за формата както и групата и контролите към групата
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
      image: new FormControl('', [Validators.required, Validators.pattern("^https://.*")]),
      comment: new FormControl('', [Validators.maxLength(500)]),
    },
    { validators: [this.phoneNumberValidator] }
  );

  constructor(
    private contactService: ContactInfoService,
    private router: Router
  ) {}

  // Проверява телефоният номер дали е според нашите изисквания такаде да започва с 359
  phoneNumberValidator(control: AbstractControl) {
    let phoneNumber = control.get('phoneNumber')?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);

    if (isPhoneValid) {
      return null;
    }

    return { phoneNumber: true };
  }

  // Логика при качване на файл да бъде взет и му се проверява формата и на долу се проверяват данните
  onFileUpload(event: any): void {
    const file = event.target.files[0];
    const fileFormat = file.name.split('.').pop();

    if (fileFormat !== 'json' && fileFormat !== 'csv') {
      alert('Unsupported file format');
      return;
    }
    const reader = new FileReader();

    reader.readAsText(file);

    let fileData

    reader.addEventListener('load', (data) => {
      switch (fileFormat) {
        case 'json':
          fileData = JSON.parse(reader.result as string);
          this.processFileData(fileData);
          event.target.value = "";
          break;
        case 'csv':
          fileData = reader.result as string;
          Papa.parse(fileData, {
            header: true,
            skipEmptyLines: true,
            complete: (result: Papa.ParseResult<Contact>) => {
              let csvData:Contact = result.data[0];
              if(!csvData.labels){
                alert('Invalid Data: No labels');
                return
              }

              csvData.labels = JSON.parse((csvData.labels as unknown) as string)
              csvData.customFields = JSON.parse((csvData.customFields as unknown) as string)
              this.processFileData(csvData);
              event.target.value = "";
            },
          });
          break;
      }
    });
  }

  // Проверяваме данните и тука за качения файл
  processFileData(fileData: Contact): void {
    if(fileData.comment === undefined){
      fileData.comment = ""
    }

    this.updateForm.patchValue({
      email: fileData.email.trim(),
      phoneNumber: fileData.phoneNumber,
      firstName: fileData.firstName.trim(),
      familyName: fileData.lastName.trim(),
      address: fileData.address.trim(),
      faxNumber: fileData.faxNumber.trim(),
      firmName: fileData.companyName.trim(),
      image: fileData.image.trim(),
      comment: fileData.comment,
    });

    if (this.updateForm.valid) {
      if (!fileData.labels) {
        alert('Invalid Data: No labels');
        this.updateForm.reset();
        return;
      } else {
        let isNotValid = false;
        let regexForColor =
          /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
        for (const label of fileData.labels) {
          if (label.name.length > 10 || label.name.length === 0) {
            isNotValid = true;
            break;
          }
          if (!regexForColor.test(label.color)) {
            isNotValid = true;
            break;
          }
          label.name = label.name.trim()
        }
        if (fileData.customFields) {
          for (const field of fileData.customFields) {
            if (field.fieldName.length > 20 || field.fieldName.length === 0) {
              isNotValid = true;
              break;
            }
            if (field.value.length > 35 || field.value.length === 0) {
              isNotValid = true;
              break;
            }
            field.fieldName = field.fieldName.trim();
            field.value = field.value.trim();
          }
        }

        if (isNotValid) {
          this.updateForm.reset();
          alert('Invalid Data: labels or fields are incorrect');
          return;
        }
        else{
          this.contactService.uploadContact(
            fileData.firstName as string,
            fileData.lastName as string,
            fileData.companyName as string,
            fileData.address as string,
            fileData.phoneNumber as string,
            fileData.email as string,
            fileData.faxNumber as string,
            fileData.comment as string,
            fileData.image as string,
            fileData.labels,
            fileData.customFields
          )
          .subscribe((data) => {
            this.router.navigate(['/home']);
          });
        }
      }
    } else {
      alert("Invalid Data")
    }
    this.updateForm.reset();
  }

  // Качваме нов контакт
  onSubmit() {
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

    const formValues = this.updateForm.value;

    this.contactService
      .uploadContact(
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
        this.router.navigate(['/home']);
      });
  }
}
