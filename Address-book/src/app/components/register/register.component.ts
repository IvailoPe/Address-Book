import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Добавяме валидациите за формата както и групата и контролите към групата
  registerForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    phoneNumber: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required,Validators.minLength(3)]),
    rePassword: new FormControl("",[Validators.required,Validators.minLength(3)])
   },
   {validators:[this.passwordsMatchValidator,this.phoneNumberValidator]}
  )

  constructor(private authService:AuthService,private router:Router){}

  // Проверяваме дали паролите са еднакви
  passwordsMatchValidator(control:AbstractControl){
    return control.get("password")?.value === control.get("rePassword")?.value ? null : {passwordsMismatch:true};
  }

  // Проверява телефоният номер дали е според нашите изисквания такаде да започва с 359
  phoneNumberValidator(control:AbstractControl){
    let phoneNumber = control.get("phoneNumber")?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);


    if(isPhoneValid){
      return null;
    }
    
    return {phoneNumber:true};
  }

  // Изпращаме формата за регистриране и я проверяваме в API-то
  onSubmit(){
    const formValues = this.registerForm.value;

    this.authService.regUser(formValues.username?.trim() as string,formValues.password?.trim() as string,formValues.email as string,formValues.phoneNumber as string).subscribe((data) => {
      if(data?.message){      
        alert(data.message)
        this.registerForm.reset();
        return;
      }
      this.router.navigate(['/login']);
    })
  }
}
