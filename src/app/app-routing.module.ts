import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'createblog',component:CreateBlogComponent},
  {path:'profile',component:ProfileComponent},
  {path:'myblogs',component:MyBlogsComponent},

 //{ path: 'myblogs', component: UserBlogsComponent },
  //{ path: 'create-blog', component: CreateBlogComponent }// Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
