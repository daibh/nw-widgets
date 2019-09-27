import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, OnDestroy } from '@angular/core';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { Subscription, fromEvent, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: '[ngx-search-engine-dropdown]',
  templateUrl: './search-engine-dropdown.component.html',
  styleUrls: ['./search-engine-dropdown.component.scss'],
  host: {
    'class': 'search-panel dropdown-menu w-100',
    '[class.show]': 'isShow',
    '[id]': 'id'
  }
})
export class SearchEngineDropdownComponent implements OnInit, OnDestroy {

  @Input() id: any;

  @Input() key: any;

  @Input() label: any;

  @Input() isShowObserable: () => Observable<boolean>;

  @Input() placeholder: string = 'Type for search...';

  @Input() itemTemplate: TemplateRef<any>;

  @Input() dataSource?: any[];

  @Input() term: string;

  @Input() formatter?: any;

  @Input() searchOnFocus: boolean;

  @Input() currenLoadedPage: number = 1;

  @Input() totalRecords: number = 0;

  @Input() maxVisibilityBuffer: number = 5;

  @Input() remailBufferLazyLoad: number = 2;

  @Input() activeItem: any;

  @Output() termChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();

  @Output() nextPage: EventEmitter<number> = new EventEmitter<number>();

  protected virtualScrollHeight: string;
  private isShow: boolean;
  private subscriptions: Subscription[] = [];
  private subScrollBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private subToggleBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private subArrowBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _elementRef: ElementRef
  ) {
    this.virtualScrollHeight = `${this.maxVisibilityBuffer * 2}rem`;
  }

  ngOnInit() {
    // Kiểm soát behavior bằng subscription
    this.subscriptions.push(
      this.subScrollBehavior.pipe( // Kiểm soát và xử lý scroll trong .virtual-scroll
        switchMap(() => fromEvent<Event>((this._elementRef.nativeElement as HTMLElement).querySelector('.virtual-scroll'), 'scroll')
          .pipe(
            map(($event) => $event.target),
            filter((target) => {
              if ((this.dataSource || []).length < this.totalRecords) { // Xử lý nếu chưa scroll hết data
                // độ cao 1 item
                const iHeight = this.remToPixel(2);
                // độ cao hiện tại của list item
                const vHeight = iHeight * (this.dataSource || []).length;
                // độ cao của số item còn lại chưa scroll mà muốn lazy load
                const rHeight = this.remToPixel(this.remailBufferLazyLoad * 2);
                // nếu scroll đến remailBufferLazyLoad item thì lazy load
                return (target as HTMLElement).scrollTop > vHeight - rHeight - (iHeight * this.maxVisibilityBuffer);
              }
              // Nếu đã scroll hết data rồi thì không load nữa
              return false;
            }),
            tap(() => { // emit báo lazy load data trang mới
              this.nextPage.emit(this.currenLoadedPage + 1);
            })
          )
        )
      ).subscribe(),
      this.subArrowBehavior.pipe( // Kiểm soat và xử lý press arrow up & arrow down ở input search
        switchMap(() => fromEvent<Event>((this._elementRef.nativeElement as HTMLElement).querySelector('input[type=text]'), 'keyup')
          .pipe(
            filter(($event: KeyboardEvent) => !($event.ctrlKey && $event.shiftKey) && ($event.keyCode === 13 || $event.keyCode === 38 || $event.keyCode === 40)),
            tap(($event: KeyboardEvent) => { // Check và xử lý theo keyCode
              const currentRefElement = this._elementRef.nativeElement as HTMLElement;
              let currentItem = currentRefElement.querySelector(`.dropdown-item.current`);
              if (!currentItem) {
                currentItem = currentRefElement.querySelector('.dropdown-item:not(.dropdown-item-search)');
              }
              if (currentItem) {
                if ($event.keyCode === 13) {
                  $event.preventDefault();
                  this.selectedItem.emit(this.dataSource.find(item => `item-${item[this.key]}` == currentItem.id));
                } else {
                  let nextItem: HTMLElement;
                  if (currentItem.classList.contains('current')) {
                    ((Array.prototype.slice.call(currentRefElement.querySelectorAll('.dropdown-item:not(.dropdown-item-search)')) || []) as Array<HTMLElement>).some((el, index, arr) => {
                      if (el.id == currentItem.id) {
                        if ($event.keyCode === 38) {
                          nextItem = arr[index < 1 ? arr.length - 1 : index - 1];
                        } else {
                          nextItem = arr[index < arr.length - 1 ? index + 1 : 0];
                        }
                      }
                    });
                  } else {
                    nextItem = currentItem as HTMLElement;
                  }
                  if (currentItem.classList.contains('current')) {
                    currentItem.classList.toggle('current');
                  }
                  if (nextItem) {
                    nextItem.classList.toggle('current');
                    nextItem.scrollIntoView();
                  }
                }
              }
            })
          )
        )
      ).subscribe()
      ,
      this.subToggleBehavior.pipe( // Kiểm soát và xử lý khi toggle dropdown-menu
        switchMap(() => this.isShowObserable),
        tap((isShow) => {
          this.isShow = isShow;

          if (isShow) { // Nếu là mở dropdown-menu
            let currentRefElement = this._elementRef.nativeElement as HTMLElement;
            // đặt tiêu điểm ở item đang active nếu có
            if (this.activeItem) {
              // reset text search
              (currentRefElement.querySelector('input[type=text]') as HTMLInputElement).value = this.activeItem[this.label];
              currentRefElement = currentRefElement.querySelector(`.dropdown-item#item-${this.activeItem[this.key]}`);
            } else {
              // reset text search
              (currentRefElement.querySelector('input[type=text]') as HTMLInputElement).value = '';
              currentRefElement = currentRefElement.querySelector('.dropdown-item:not(.dropdown-item-search)');
            }
            if (currentRefElement) {
              currentRefElement.classList.add('current');
            }
          }
        })
      ).subscribe(

      )
    );
  }

  setSearchAreaFocus = () => {
    ((this._elementRef.nativeElement as HTMLElement).querySelector('input[type=text]') as HTMLInputElement).focus();
  }

  private remToPixel = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

  protected isActive = item => this.activeItem && this.activeItem[this.key] == item[this.key];

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }
}
