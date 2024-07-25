import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {

  constructor() { }


  isLoggedIn(){

    let token = localStorage.getItem('token')
    if(token){
      return true
    }
    return false
  }


}
