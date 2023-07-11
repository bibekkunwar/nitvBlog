import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent {
  public postForm!: FormGroup;
  allMighty: any;
  public Editor = ClassicEditor;
  data: any;
  userId!: number;
  allBlogLists: any[] = [];
  posts: any[] | undefined;
  postId!: number;
  constructor(
    private _apiService: ApiService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      blog_title: new FormControl(),
      blog_summary: new FormControl(),
      blog_content: new FormControl(),
      blog_header_image: new FormControl(),
    });

    /* The code is retrieving the authentication token from the local storage and decoding it using the
    `jwt-decode` library. */
    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');

    const decodedToken: any = jwt_decode(encodedToken.access);
    this.userId = decodedToken.user_id;
    this.postId = +this.route.snapshot.params['postId'];

    this.createPost();
    if (this.postId) {
      this._apiService.getPostDetailById(this.postId).subscribe((res) => {
        this.createPost(res);
      });
    }
  }

  createPost(item: any = {}) {
    this.postForm.patchValue(item);
  }

  file!: File;
  formData!: FormData;
  uploadFile(e: any) {
    this.file = e.target.files[0];
  }

  addPost() {
    const data: any = {
      id: this.postForm.value.id,
      blog_title: this.postForm.value.blog_title,
      blog_summary: this.postForm.value.blog_summary,
      blog_content: this.postForm.value.blog_content,
      blog_header_image: this.file,
      user: this.userId,
    };
    if (this.postId) {
      this._apiService.updatePost(this.postId, data).subscribe(() => {
        alert('Updated successfully');
        this.router.navigateByUrl('/bloglist');
      });
    } else {
      this._apiService.createPost(data).subscribe(() => {
        alert('Created successfully');
        this.router.navigateByUrl('/bloglist');
      });
    }
  }

  logOut(): void {
    this._apiService.logOut();
    this.router.navigate(['']);
  }
}
