import { Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subscriber, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { SearchEngineDropdownComponent } from './search-engine-dropdown.component';

@Component({
  selector: 'ngx-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchEngineComponent),
      multi: true
    }
  ]
})
export class SearchEngineComponent implements OnInit, OnDestroy {

  // Observable định nghĩa cách thức tìm kiếm
  @Input() search: (term: string, nextPage?: number) => Observable<any>;

  // @Input() required: boolean | 'required';

  // Giá trị giữ chỗ nếu không có item nào được chọn
  @Input() placeholder: string = 'Select one item';

  // Trường được sử dụng để hiển thị giá trị của item được chọn
  @Input() label: string = 'name';

  @Input() key: string = 'id';

  @Input() searchOnFocus: boolean = true;

  // Số item tối đa hiển thị
  @Input() maxVisibilityBuffer: number = 5;

  // model lưu trữ giá trị của component
  modelValue: any;

  // Mảng kết quả tìm kiếm
  filterResult: any[];

  currenLoadedPage: number = 1;

  totalRecords: number = 0;

  // Từ khóa tìm kiếm
  term: string;

  // mảng subscriptions unsubscrible khi close dropdown-menu
  subscriptions: Subscription[] = [];
  destroySubscriptions: Subscription[] = [];
  protected isShowSubscriber: Subscriber<boolean>;
  protected isShowObserable: Observable<boolean> = new Observable(subscriber => this.isShowSubscriber = subscriber);
  private _isCollapse: boolean = true;
  private subToggleBehavior = new BehaviorSubject<any>(this._isCollapse);
  private subOutSizeBehavior = new BehaviorSubject<any>(this._isCollapse);
  private subFocusBehavior = new BehaviorSubject<any>(false);

  @ContentChild('itemTemplate', { static: false }) itemTemplate: TemplateRef<any>;
  @ViewChild('searchEngineDropdown', { read: SearchEngineDropdownComponent, static: false }) searchEngineDropdown: SearchEngineDropdownComponent;
  constructor(
    private _elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.destroySubscriptions.push(
      // Xử lý sự kiện khi click vào dropdown
      this.subToggleBehavior.pipe(
        debounceTime(200), // kiểm soát sụ kiện mỗi 200ms một lần
        switchMap(() => fromEvent<Event>(this._elementRef.nativeElement, 'click').pipe( // Kiểm soát sự kiện cho các element được click thuộc component
          (filter($event => { // Lọc ra element click có class hoặc có parent class là input-search-engine-control
            if (($event.target as HTMLElement).classList.contains('input-search-engine-control'))
              return true;
            return ($event.target as HTMLElement).parentElement.classList.contains('input-search-engine-control');
          })),
          tap(($event) => {
            $event.preventDefault();
            // Trường hợp chọn item rồi thì mặc định từ khóa search là tên hiển thị của item được chọn
            if(this._isCollapse) {
              if (this.modelValue) {
                this.term = this.modelValue[this.label];
              }
            }
            this.toggle(); // Thực hiện toggle dropdown menu
            if (!this._isCollapse) { // trường hợp mở dropdown menu
              setTimeout(() => this.searchEngineDropdown.setSearchAreaFocus(), 0); // tự động focus vào input search
              this.subscriptions.push(
                this.searchEngineDropdown.termChange.pipe( // thực hiện search khi giá trị của term thay đổi
                  debounceTime(200), distinctUntilChanged(), // Xử lý mỗi lần search ít nhất cách nhau 200ms và giá trị search phải thay đổi
                  switchMap((term) => this.search(term)) // gọi obserable search được định nghĩa từ function cha
                ).subscribe(res => { // xử lý kết quả search
                  this.filterResult = res.items;
                  this.totalRecords = res.totalRecords;
                  this.currenLoadedPage = 1;
                })
              );
              // Xử lý lazy load with virtual scroll
              this.subscriptions.push(
                this.searchEngineDropdown.nextPage.pipe(
                  distinctUntilChanged(),
                  switchMap((next) => {
                    this.currenLoadedPage = next;
                    return this.search(this.term, next);
                  })
                ).subscribe(res => { // xử lý kết quả search
                  this.filterResult = this.currenLoadedPage === 1 ? res.items : (this.filterResult || []).concat(res.items);
                  this.totalRecords = res.totalRecords;
                })
              );
              // Xử lý focus
              if (this.searchOnFocus) {
                this.searchEngineDropdown.nextPage.emit(1);
              }
              // Xử lý chọn item
              this.subscriptions.push(
                this.searchEngineDropdown.selectedItem.pipe( // Xử lý khi click vào item trên dropdown menu
                  tap(sel => { // Xử lý kết quả được chọn
                    this.writeValue(sel);
                    this.collapse();
                  })).subscribe()
              );
            }
          })
        ))
      ).subscribe()
    );

    this.destroySubscriptions.push(
      // Xử lý sự kiện click outsize component
      this.subOutSizeBehavior.pipe(switchMap(() => fromEvent<Event>(document, 'click').pipe(
        filter(($event) => { // Lọc element được click không thuộc về component
          return !this._elementRef.nativeElement.contains($event.target);
        }),
        tap(() => { // thực hiện đóng dropdown menu
          this.collapse();
        })
      ))).subscribe()
    );
  }

  /**
   * toggle
   * toggle dropdown-menu state
   */
  toggle = () => {
    this._isCollapse = !this._isCollapse;
    this.isShowSubscriber.next(!this._isCollapse);
    if (this._isCollapse) { // Xử lý hủy subscrible khi đóng dropdown menu
      while (this.subscriptions.length) {
        this.subscriptions.pop().unsubscribe();
      }
    }
  }

  private collapse = () => {
    this._isCollapse = true;
    this.isShowSubscriber.next(!this._isCollapse);
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  /**
   * showValue
   * Hiển thị giá trị trên dropdown
   */
  protected showValue = () => {
    return this.modelValue && this.modelValue[this.label] ? this.modelValue[this.label] : this.placeholder;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    if (value) {
      this.modelValue = value;
    }
    this.onChange(value);
    this.onTouched(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    // Hủy hết subscription trước khi hủy component
    while (this.destroySubscriptions.length) {
      this.destroySubscriptions.pop().unsubscribe();
    }
  }

}
