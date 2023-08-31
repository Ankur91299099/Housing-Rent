import { Component } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  constructor(private alertfy:AlertifyService){}
   
  loggedIn()
  {
   return true;
  }

  onLogout()
  {
    this.alertfy.success("Logout Successfully");
        return true;
  }
}
