import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css'
})
export class MyBlogsComponent implements OnInit {
  blogs:Blog[]=[]

  constructor(private blogServices:BlogService){}
  
  ngOnInit(): void {
    this.blogServices.getmyBlogs().subscribe(res=>{
      // this.blogs=res
      console.log(res);
      
    })
  }
}
