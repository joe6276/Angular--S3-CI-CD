import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUser, LoginResponse, LoginUser, RegisterResponse } from '../Models/Auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient) { }


  private readonly Base_URL ='http://34.235.155.29/auth/'
  
  loginUsers(user:LoginUser):Observable<LoginResponse>{
    return this.http.post<LoginResponse>( this.Base_URL+'login', user, {
      headers:{
          "Content-Type":"application/json" 
      }
    })
  }

  registerUser(newUser:AddUser):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(this.Base_URL+'register', newUser)
  }
}
