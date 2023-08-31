import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  
   constructor(private auth : AuthService,
                private alertfy: AlertifyService,
                private router: Router){}

  onSubmit(loginForm:NgForm)
  {
       const user = this.auth.authUser(loginForm.value);
       if(user)
       {
        this.alertfy.success("Login successfully")
        this.router.navigate(['/']);
       }
       else
       {
        this.alertfy.error("Invalid credential");
       }
       console.log(loginForm)
  }
}
