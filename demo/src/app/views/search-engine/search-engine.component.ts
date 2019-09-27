import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Industry, IndustryService } from 'src/app/shared/services/industry.service';


@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {

  //-> Item được chọn
  selectedItems: Industry;
  // -> Trang lấy dữ liệu
  currentPage = 0;
  // -> Tổng số bản ghi
  totalCount: number = 0;
  // Index lấy bản ghi tiếp theo ?? cái này chưa chắc đã cần
  startIndex: number = 0;
  // -> Số bản ghi trên request
  pageSize: number = 10;
  // -> Số bản ghi hiển thị
  itemShows: number = 5;
  // -> Khi scroll nếu list scroll còn số bản ghi này sẽ load tiếp
  numberOfItemsFromEndBeforeFetchingMore = 5;
  // Khi load data hiển thị effect loading
  loading: boolean;
  // mảng subscription
  subscriptions: Subscription[] = [];

  form: FormGroup;

  searchSelected: any;

  constructor(
    private industryService: IndustryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      searchSelected: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  searchEngine = (term: string, nextPage?: number) => this.industryService.getIndustrysWithParams({
    size: this.pageSize,
    q: term,
    page: nextPage,
    sort: undefined,
    filter_status: undefined
  }).pipe(
    map(res => {
      this.currentPage = Math.ceil(res.currentRecords / this.pageSize);
      this.startIndex = res.startIndex;
      return {
        totalRecords: res.totalRecords,
        pageSize: this.pageSize,
        currentRecords: res.currentRecords,
        startIndex: res.startIndex,
        items: res.items,
        term
      };
    }),
    catchError(() => {
      return of([]);
    }));

}
