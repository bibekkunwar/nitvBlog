import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { BannnerComponent } from './bannner/bannner.component';

const routes: Routes = [
  // {path:'',component:}
  {path:'',pathMatch:'full',component:BlogHomeComponent},
  {path:'bloglist',component:BlogComponent, canActivate:[AuthGuard]},
  {path:'blog-detail/:postId',component:BlogDetailComponent, canActivate: [AuthGuard]},
  {path:'createpost',component:CreatepostComponent, canActivate:[AuthGuard]},
  {path:'updatepost/:postId',component:CreatepostComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'banner', component: BannnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
