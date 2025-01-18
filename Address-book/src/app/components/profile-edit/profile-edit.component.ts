import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserInfoService } from '../../user-info.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {

  constructor(private userServices:UserInfoService,private authServices:AuthService,private router:Router){}

  // Добавяме валидациите за формата както и групата и контролите към групата
  updateFormEmail = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password1:new FormControl("",[Validators.required,Validators.minLength(3)])
  })
  updateFormUsername = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    password2:new FormControl("",[Validators.required,Validators.minLength(3)])
  })
  updateFormPassword = new FormGroup({
    oldPassword:new FormControl("",[Validators.required,Validators.minLength(3)]),
    password3:new FormControl("",[Validators.required,Validators.minLength(3)])
  })
  updateFormPhone = new FormGroup({
    phoneNumber:new FormControl("",[Validators.required]),
    password4:new FormControl("",[Validators.required,Validators.minLength(3)])
  },{validators:[this.phoneNumberValidator]})

  // Проверява телефоният номер дали е според нашите изисквания такаде да започва с 359
  phoneNumberValidator(control:AbstractControl){
    let phoneNumber = control.get("phoneNumber")?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);


    if(isPhoneValid){
      return null;
    }
    
    return {phoneNumber:true};
  }

  // Изпращаме информацията за промяна на username
  onSubmitUsername(){
    const formValues = this.updateFormUsername.value;
    
    this.userServices.updateUsername(formValues.password2 as string,formValues.username as string).subscribe((data) =>{
      if(data.message === "Wrong password"){
        alert(data.message);
      }
      else{
         this.authServices.unLogUser()
         this.router.navigate(['/login']);
      }
    })
    
  }

  // Изпращаме информацията за промяна на email
  onSubmitEmail(){
    const formValues = this.updateFormEmail.value;
    
    this.userServices.updateEmail(formValues.password1 as string,formValues.email as string).subscribe((data) =>{
        if(data.message === "Wrong password"){
          alert(data.message);
        }
        else{
          this.authServices.unLogUser()
          this.router.navigate(['/login']);
        }
    })
  }

  // Изпращаме информацията за промяна на парола
  onSubmitPassword(){
    const formValues = this.updateFormPassword.value;
    
    this.userServices.updatePassword(formValues.oldPassword as string,formValues.password3 as string).subscribe((data) =>{
      if(data.message === "Wrong password"){
        alert(data.message);
      }
      else{
        this.authServices.unLogUser()
        this.router.navigate(['/login']);
      }
    })
  }

  // Изпращаме информацията за промяна на телефонен номер
  onSubmitPhone(){
    const formValues = this.updateFormPhone.value;
    
    this.userServices.updatePhone(formValues.password4 as string,formValues.phoneNumber as string).subscribe((data) =>{
      if(data.message === "Wrong password"){
        alert(data.message);
      }
      else{
        this.authServices.unLogUser()
        this.router.navigate(['/login']);
      }
    })
  }
}
