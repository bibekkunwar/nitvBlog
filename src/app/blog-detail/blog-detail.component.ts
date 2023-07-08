import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  post: any;
  postId!: number;
  viewAll: any;
  newAccessToken: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['postId'];
    this.refreshAccessTokenIfAvailable();
    this.viewPost();
  }

  viewPost() {
    this._apiService.getPostDetailById(this.postId).subscribe((res: any) => {

      const encodedUrl = res.blog_header_image?.split('media/')[1];
      const decodedUrl = decodeURIComponent(encodedUrl);
      const modifiedUrl = decodedUrl.replace('%3A', ':');

      this.viewAll = { ...res, blog_header_image: modifiedUrl };
    });
  }

  refreshAccessTokenIfAvailable() {

    if (localStorage.getItem('auth_token')) {
      const auth_token = JSON.parse(localStorage.getItem('auth_token') || '');
      const refresh_token = auth_token.refresh as string;
      this._apiService.refreshKeyGeneerator(refresh_token);
    }
  }
}
