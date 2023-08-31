import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registrationForm!: FormGroup;
  userSubmitted!:boolean;
  user!:User;

 constructor(private alertyfy:AlertifyService){}
ngOnInit()
{
    this.registrationForm = new FormGroup(
      {
        userName:new FormControl(null,Validators.required),
        email:new FormControl(null,[Validators.email,Validators.required]),
        password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
        confirmPassword:new FormControl(null,Validators.required),
        mobile:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      },this.passwordMatchingValidator
    );
}

// passwordMatchingValidators(fg:FormGroup):Validators{
//   return fg.get('password').value===fg.get('confirmPassword').value?null :{notmatched:true};
// }

passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
  return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
    { notmatched: true }
};
onSubmit()
{
  this.userSubmitted=true;
  if(this.registrationForm.valid){
  console.log("Hi form submitted");
  this.userSubmitted=false;
  this.registrationForm.reset();
  this.alertyfy.success('Congrats , you are register successfully')
  }
  else
  {
    this.alertyfy.error('Try , again not register successfully')
  }
}
 
userData():User{
  return this.user={
    userName:this.userName.value,
    email:this.email.value,
    password:this.password.value,
    mobile:this.mobile.value
  }
}

get userName()
{
  return this.registrationForm.get('userName') as FormControl
}

get email()
{
  return this.registrationForm.get('email') as FormControl
}

get password()
{
  return this.registrationForm.get('password') as FormControl
}

get confirmPassword()
{
  return this.registrationForm.get('confirmPassword') as FormControl
}

get mobile()
{
  return this.registrationForm.get('mobile') as FormControl
}

}
