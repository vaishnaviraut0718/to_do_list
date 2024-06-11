import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signup:FormGroup|any;
  signuser:any;
  constructor(private router:Router,private http:HttpClient,private toastr: ToastrService){}
  ngOnInit(){
  this.signup=new FormGroup({
    'name':new FormControl('', [Validators.required, Validators.minLength(3)]),
    'email':new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])

  })
}


    signupdata() {
      if (this.signup.valid) {
        this.signuser = this.signup.value.name;
        this.http.post<any>("http://localhost:3000/login", this.signup.value)
          .subscribe(res => {
            this.toastr.success('You Have Registered Successfully!', 'Success!');
            this.router.navigate(['/login']);
          }, error => {
            console.log('error');
            this.toastr.error("Something went wrong");
          });
      } else {
        this.toastr.error("Please fill in the form correctly");
        this.signup.markAllAsTouched();
      }
    } 
}
