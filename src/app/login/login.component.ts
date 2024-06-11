import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login:FormGroup|any;

  constructor(private http:HttpClient,private route:Router,private authService:AuthServiceService){}
  ngOnInit(){
    this.login=new FormGroup({
      'emailInput':new FormControl('', [Validators.required, Validators.email]),
      'passwordInput':new FormControl('', [Validators.required, Validators.minLength(6)])
    })
   }
  

  logindata(login:FormGroup){
    // console.log(this.login.value);
    this.http.get<any>("http://localhost:3000/login")
    .subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===this.login.value.emailInput && a.password===this.login.value.passwordInput
      });
      if(user){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        localStorage.setItem('currentUser', user.name);
        this.route.navigate(['/welcome']);
      }else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Enter Valid Credentials",
          showConfirmButton: false,
          timer: 1800
        });
        this.route.navigate(['/login']);
      }
    })
   }
  }

 