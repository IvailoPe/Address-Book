import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Добавяме валидациите за формата както и групата и контролите към групата
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    password: new FormControl("",[Validators.required,Validators.minLength(3)]),
  });

  constructor(private authService:AuthService, private router:Router){}

  // Изпращаме информацията за логване и я проверяваме в API-to
  onSubmit(){
    const formValues = this.loginForm.value;
      
    this.authService.logUser(formValues.username?.trim() as string,formValues.password?.trim() as string).subscribe((data) => {
      if(data?.message){      
        alert(data.message)
        this.loginForm.reset();
        return;
      }
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
      this.router.navigate(['/home']);
    })
  }
}
