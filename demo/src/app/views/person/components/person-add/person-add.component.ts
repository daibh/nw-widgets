import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPerson } from 'src/app/shared/models/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {
  person: IPerson;
  validGroup: boolean;

  subbehaviors: Subscription[] = [];

  constructor(
    private personService: PersonService,
  ) { }

  ngOnInit() { }

  onSave = (isClose: boolean) => {
    console.log('onSave', this.validGroup, this.person);
    if (isClose) {
      this.onClose();
    }
  }

  onClose = () => {
    console.log('onClose');
  }

  ngOnDestroy() {
    while (this.subbehaviors && this.subbehaviors.length) {
      this.subbehaviors.pop().unsubscribe();
    }
  }

}
