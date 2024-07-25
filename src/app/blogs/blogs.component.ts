import { Component, OnInit } from '@angular/core';
import { Blog } from '../Models/Blog';
import { BlogService } from '../Services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
blogs:Blog[]=[]

constructor(private blogServices:BlogService){}

ngOnInit(): void {
  this.blogServices.getAllBlogs().subscribe(res=>{
    console.log(res);
    
    this.blogs=res
  })
}
}
