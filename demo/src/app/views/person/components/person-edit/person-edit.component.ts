import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPerson } from 'src/app/shared/models/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  person: IPerson;
  validGroup: boolean;

  subbehaviors: Subscription[] = [];

  constructor(
    private router: Router,
    private personService: PersonService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subbehaviors.push(
      this.activatedRouter.paramMap.pipe(
        map(param => param.has('id') ? param.get('id') : null),
        tap(id => this.subbehaviors.push(
          this.personService.getPerson(id).pipe(
            tap(p => {
              this.person = p;
            })
          ).subscribe()
        ))
      ).subscribe());
  }

  onUpdate = () => {
    console.log('onUpdate', this.validGroup, this.person);
  }

  onBack = () => {
    this.router.navigate(['person']);
  }

  ngOnDestroy() {
    while (this.subbehaviors && this.subbehaviors.length) {
      this.subbehaviors.pop().unsubscribe();
    }
  }

}
