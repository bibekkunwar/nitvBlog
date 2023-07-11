import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
interface DecodedType {
  user_id: number;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements AfterViewInit, OnInit {
  allMighty: any[] = [];
  pageNo: number = 1;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  totalPagesArray: number[] = [];
  totalCount!: number;
  totalCountForMyPost!: number
  userId!: number;
  myposts: any[] = [];

  constructor(private _apiService: ApiService, private router: Router) {
    if (localStorage.getItem('auth_token')) {
      /* The line `this._apiService.authenticate(true)` is calling a method `authenticate()` from the
      `_apiService` instance. It is passing `true` as an argument to the `authenticate()` method. The
      purpose of this line is to authenticate the user by setting a flag or updating the authentication
      status in the `_apiService`. The exact implementation and functionality of the `authenticate()`
      method would be defined in the `ApiService` class. */
      this._apiService.authenticate(true)
      const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');
      const decodedToken: DecodedType = jwt_decode(encodedToken.refresh);
      this.userId = decodedToken.user_id;
    }

  }

  ngOnInit(): void {
    this.getList(this.pageNo, this.pageSize);
  }


  ngAfterViewInit(): void {
    (document.getElementById('All Posts') as HTMLElement).style.display =
      'block';
  }

  openCity(evt: any, name: string) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');

    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    (document.getElementById(name) as HTMLElement).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  getList(pageNo: number, pageSize: number) {
    this.allMighty = [];
    this._apiService.getBlogList(pageNo, pageSize).subscribe((res: any) => {
      this.totalCount = res.count;
      const filteredList = res.results;
      filteredList.map((item: any) => {
        const encodedUrl = item.blog_header_image?.split('media/')[1];
        const decodedUrl = decodeURIComponent(encodedUrl);
        const modifiedUrl = decodedUrl.replace('%3A', ':');
        const data = { ...item, blog_header_image: modifiedUrl };
        this.allMighty.push(data);

      });
      this.getMyPosts()
    });
  }

  getMyPosts() {
    this.myposts = this.allMighty.filter(
      (item: any) => item.user_id === this.userId
    );
    console.log(this.myposts)

    this.totalCountForMyPost = this.myposts.length
  }




  deletePost(id: number) {
    // if (localStorage.getItem('auth_token')) {
    //   const auth_token = JSON.parse(localStorage.getItem('auth_token') || '');
    //   const refresh_token = auth_token.refresh as string;
    //   this._apiService.refreshKeyGeneerator(refresh_token);
    // }
    const confirmed = confirm('are you sure? delete!!!');
    if (confirmed) {
      this._apiService.deletePost(id).subscribe({
        next: (response) => {
          alert('deleted successfully');
          this.getList(this.pageNo, this.pageSize)
          this.router.navigateByUrl("['/bloglist']");
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.status);
        },
      });
    }
  }
}

