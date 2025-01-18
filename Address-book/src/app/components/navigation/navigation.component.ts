import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor(private authServices:AuthService, private router:Router){}
  
  // При натискане на log out в навигацията се разлогваме
  logOut(){
    this.authServices.unLogUser();
    this.router.navigate(["login"]);
  }
}
