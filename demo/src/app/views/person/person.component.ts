import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { IPerson } from 'src/app/shared/models/person.model';
import { SearchResponse } from 'src/app/shared/models/search.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, AfterViewInit {

  searchResponse$: Observable<SearchResponse<IPerson>>;
  enterSubject$: Subject<string> = new Subject<string>();

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchResponse$ = this.enterSubject$.pipe(
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

  onAdd = () => {
    console.log('onAdd');
  }

  onEdit = (p: IPerson) => {
    console.log('onEdit', p.id);
    this.router.navigate(['person-edit', p.id])
  }

  onDelete = (p: IPerson) => {
    console.log('onDelete', p.id);
  }

}
