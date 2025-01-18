import { Component } from '@angular/core';
import { UserInfoService } from '../../user-info.service';
import { profileInterface } from '../../interfaces/user-interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private userServices:UserInfoService, private authService:AuthService, private router:Router){}

  profileData!:profileInterface;
  
  // На onInit hook-ка взимаме информацията на сегашния логнат потребител за да я покажем 
  ngOnInit():void {
    this.userServices.getInfoAboutUser().subscribe(data => {
      this.profileData = data; 
    })
  }

  // Изтриваме профила след потвърдена парола
  deleteProfile(){
    let password = prompt("Enter your password for confirmation");
    if(password === "" || password === null){
      return
    }
    
    this.userServices.deleteUser(password).subscribe((data) => {
      
      if(data.message === "success"){
        this.authService.unLogUser();
        this.router.navigate(['/register']);
      }
      else if(data.message === "Wrong password"){
        alert("Password is not correct");
        return;
      }
    });
  }

  // Редиректваме към edit page
  redirectToEditProfilePage(){
    this.router.navigate(['/profile/edit']);
  }
}
