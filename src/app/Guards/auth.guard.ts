import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatusService } from '../Services/auth-status.service';

export const authGuard: CanActivateFn = (route, state) => {

   const router= inject(Router)
  const Authstatus=inject(AuthStatusService)

  if(Authstatus.isLoggedIn()){
    return true
  }else{
    router.navigate(['/login'])
  }

  return true;
};
