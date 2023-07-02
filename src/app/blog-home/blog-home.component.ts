import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss'],
})
export class BlogHomeComponent implements OnInit {
  allMighty: any[] = [];
  pageNo: number = 1;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  totalPagesArray: number[] = [];
  totalCount!: number;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getList(this.pageNo, this.pageSize);
    this.openTab(undefined,'All Posts')
  }
  openTab(evt: any, name: string) {
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
    if(evt){
      evt.currentTarget.className += ' active';
    }

  }

  getList(pageNo: number, pageSize: number) {
    this.allMighty = [];
    this._apiService.getBlogList(pageNo, pageSize).subscribe((res: any) => {
      this.totalCount = res.count;
      const filteredList = res.results;
      console.log(filteredList)
      filteredList.map((item: any) => {
        const encodedUrl = item.blog_header_image?.split('media/')[1];
        const decodedUrl = decodeURIComponent(encodedUrl);
        const modifiedUrl = decodedUrl.replace('%3A', ':');
        const data = { ...item, blog_header_image: modifiedUrl };
        this.allMighty.push(data);
      });
    });
  }
}
