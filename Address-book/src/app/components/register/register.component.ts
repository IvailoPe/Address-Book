import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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

  passwordsMatchValidator(control:AbstractControl){
    return control.get("password")?.value === control.get("rePassword")?.value ? null : {passwordsMismatch:true};
  }

  phoneNumberValidator(control:AbstractControl){
    let phoneNumber = control.get("phoneNumber")?.value;

    let isPhoneValid = /^3598[789]\d{7}$/.test(phoneNumber);


    if(isPhoneValid){
      return null;
    }
    
    return {phoneNumber:true};
  }

  onSubmit(){
    const formValues = this.registerForm.value;

    this.authService.regUser(formValues.username as string,formValues.password as string,formValues.email as string,formValues.phoneNumber as string).subscribe((data) => {
      if(data?.message){      
        alert(data.message)
        this.registerForm.reset();
        return;
      }
      this.router.navigate(['/login']);
    })
  }
}
