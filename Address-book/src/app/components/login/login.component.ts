import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    password: new FormControl("",[Validators.required,Validators.minLength(3)]),
  });

  constructor(private authService:AuthService, private router:Router){}

  onSubmit(){
    const formValues = this.loginForm.value;
      
    this.authService.logUser(formValues.username as string,formValues.password as string).subscribe((data) => {
      if(data?.message){      
        alert(data.message)
        this.loginForm.reset();
        return;
      }
      localStorage.setItem("token",JSON.stringify(data));
      this.router.navigate(['/home']);
    })
  }
}
