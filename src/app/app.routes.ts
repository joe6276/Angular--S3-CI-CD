import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './Guards/auth.guard';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'register' , component:RegisterComponent},
    {path:'blogs', canActivate:[authGuard], component: BlogsComponent},
    {path:'login', component:LoginComponent},
    {path:'addBlogs', component:AddBlogComponent},
    {path:'myBlogs', component:MyBlogsComponent},
    {path:'blog/:id', component:SingleBlogComponent},
    {path:'**', component:NotFoundComponent}
];
