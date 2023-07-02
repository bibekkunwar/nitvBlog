import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const routes: Routes = [
  // {path:'',component:}
  {path:'',pathMatch:'full',component:BlogHomeComponent},
  {path:'bloglist',component:BlogComponent},
  {path:'blog-detail/:postId',component:BlogDetailComponent},
  {path:'createpost',component:CreatepostComponent},
  {path:'updatepost/:postId',component:CreatepostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
