import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStatusService } from '../Services/auth-status.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(public auth:AuthStatusService , private router:Router){}

  logout(){
    localStorage.clear()
    this.router.navigate([''])

  }
}
