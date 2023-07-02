import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  post: any;
  postId!: number;
  viewAll: any;


  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['postId'];
    this.viewPost();
  }

  viewPost() {
    this._apiService.getPostDetailById(this.postId).subscribe((res: any) => {
      this.viewAll = res;
    });
  }
}
