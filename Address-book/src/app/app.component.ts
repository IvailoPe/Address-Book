import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Address-book';
  isAuthPage = false;
  constructor(private router: Router){
    this.router.events.subscribe((event: any) => {
      if (event.url && (event.url === "/login" || event.url === "/register")) {
        this.isAuthPage = true;
      }
      else{
        this.isAuthPage = false;
      }
    });
  }
}
