import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { IPerson } from 'src/app/shared/models/person.model';
import { SearchResponse } from 'src/app/shared/models/search.model';

@Component({
  selector: 'app-common-concept',
  templateUrl: './common-concept.component.html',
  styleUrls: ['./common-concept.component.scss']
})
export class CommonConceptComponent implements OnInit, AfterViewInit {
  person$: Observable<SearchResponse<IPerson>>;
  enterSubject$: Subject<string> = new Subject<string>();
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.person$ = this.enterSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => console.log('search: ', term)),
      switchMap(term => this.personService.getPersons({
        q: term,
        size: 10
      }))
    );
  }

  ngAfterViewInit() {
    this.enterSubject$.next('');
  }

  onTermEnter = $event => this.enterSubject$.next($event.target.value);

}
