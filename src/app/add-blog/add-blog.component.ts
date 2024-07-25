import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { UploadService } from '../Services/upload.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent  implements OnInit{
form!:FormGroup
imageUrl=''
upload=false
 
  constructor(private fb:FormBuilder, private blogService:BlogService, private router:Router, private uService:UploadService){}
  ngOnInit(): void {
    this.form= this.fb.group({
      Heading:this.fb.control(null, Validators.required),
      Description:this.fb.control(null, Validators.required),
    })
  }

  onSubmit(){
    this.blogService.addBlog({...this.form.value, ImageUrl:this.imageUrl}).subscribe(res=>{
      console.log(res.message);
      this.router.navigate(['/blogs'])
    })
  }

  onChange(event:Event){
   const output= (event.target as HTMLInputElement);
   console.log(output.files);
   
    if(output.files && output.files?.length>0){
      const file=output.files[0]
      this.uService.getUrl().subscribe(res=>{
        console.log(res);
        this.imageUrl=res.key
        this.uService.uploadImage(res.url,file).subscribe(res=>{
          console.log(res);
          
        })        
      })
    }
  }
    
}
