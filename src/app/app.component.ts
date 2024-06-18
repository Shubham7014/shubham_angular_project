import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { User } from './_models/user';
import { AuthenticationService } from './_servicies/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medicines-patient';
  currentUser: User |null = new User;
  // constructor(private router: Router, private authenticationService: AuthenticationService){
  //   this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  // }
  // logout(){
  //   this.authenticationService.logout();
  //   this.router.navigate(['/login']);
  // }
}
