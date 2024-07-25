import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit{
  form!:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthService){}

  ngOnInit(): void {
    this.form= this.fb.group({
      Name: this.fb.control(null, Validators.required),
      Email: this.fb.control(null, Validators.required),
      Password: this.fb.control(null, Validators.required)
    })
  }


  onSubmit(){
    this.auth.registerUser(this.form.value).subscribe(res=>{
      this.router.navigate(['/login'])
    })
  }

}
