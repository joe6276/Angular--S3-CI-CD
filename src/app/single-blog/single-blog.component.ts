import { Component, OnInit } from '@angular/core';
import { Blog } from '../Models/Blog';
import { BlogService } from '../Services/blog.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css'
})
export class SingleBlogComponent  implements OnInit{

  blog!:Blog
  constructor( private blogService:BlogService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((param:Params)=>{
      this.blogService.getBlog(param['id']).subscribe(res=>{
        this.blog=res
      })
    })
  }

}
