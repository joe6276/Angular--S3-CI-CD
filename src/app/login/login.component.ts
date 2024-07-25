import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  form!:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService,){}
  ngOnInit(): void {
    this.form= this.fb.group({
      Email:this.fb.control(null, Validators.required),
      Password:this.fb.control(null, Validators.required)
    })
  }

  onSubmit(){
   this.authService.loginUsers(this.form.value). subscribe(res=>{
      localStorage.setItem('token', res.token)
      this.router.navigate(['/blogs'])
     
      
      // console.log(res);
      
   })
  }
}
