import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { IPerson } from 'src/app/shared/models/person.model';
import { FormBuilder, Validators, FormGroup, ValidationErrors, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() value: IPerson;

  @Input() valid: boolean;

  @Output() valueChange: EventEmitter<IPerson> = new EventEmitter<IPerson>();

  @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup;

  subFormGroup: Subscription = new Subscription();

  originValue: IPerson;

  origin = {
    originValue: null
  }

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        id: '',
        name: ['', [Validators.required], [mustUniqueValidator(this.personService, this.origin)]],
        email: ['', [Validators.required], [mustUniqueValidator(this.personService, this.origin)]],
        address: ['', [Validators.required], [mustUniqueValidator(this.personService, this.origin)]],
      }
      // ,{
      //   validators: mustUniqueValidator(this.personService, 'email', 'id', 'name')
      // }
    );
    this.subFormGroup = this.formGroup.valueChanges.pipe(
      tap(changes => {
        this.valueChange.emit(_.assign(this.formGroup.getRawValue()));
        setTimeout(() => this.validChange.emit(this.formGroup.valid), 0)
      })
    ).subscribe();

  }

  // convenience getter for easy access to form fields
  get nameControl() { return this.formGroup.get('name'); }
  get emailControl() { return this.formGroup.get('email'); }
  get addressControl() { return this.formGroup.get('address'); }

  ngOnChanges(simpleChange: SimpleChanges) {
    const valueChange = simpleChange['value'];
    if (valueChange && !valueChange.firstChange && !_.isEqual(valueChange.currentValue, valueChange.previousValue)) {
      if (!this.originValue && valueChange.currentValue && valueChange.currentValue.id) {
        this.originValue = valueChange.currentValue;
        this.origin.originValue = this.originValue;
      }
      this.formGroup.patchValue(valueChange.currentValue);
    }
  }

  ngOnDestroy() {
    this.subFormGroup.unsubscribe();
  }

}

export function mustUniqueValidator(personService: PersonService, origin: { originValue: IPerson }): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const originValue = origin.originValue;
    console.log('control', control, originValue);
    let formGroup = control.parent;
    const nameControl = formGroup.controls['name'];
    const emailControl = formGroup.controls['email'];
    const idControl = formGroup.controls['id'];
    const isAdd = !idControl.value;
    let subService: Subscription = null;
    console.log('nameControl', nameControl, control, control == nameControl, (isAdd || (originValue != null && nameControl.value !== originValue.name)));
    // nếu cần dùng address control
    // const addressControl = formGroup.get('address');
    if (control == nameControl && (isAdd || (originValue && nameControl.value !== originValue.name))) {
      // trường hợp nhập tên
      // form thêm mới
      // form chỉnh sửa có tên nhập vào khác với tên ban đầu
      return personService.getPersonByNameAndEmail({
        id: idControl.value,
        name: nameControl.value
      }) // check trùng tên
        .pipe(debounceTime(200), distinctUntilChanged()).pipe(
          map(res => {
            console.log(`Check trùng tên: { name: ${nameControl.value}}, id: ${idControl.value} }`, nameControl.value);
            if (subService != null) {
              subService.unsubscribe();
              subService = null;
            }
            console.log('END[ name unique ]');
            return res && res.length ? { nameUnique: 'Tên đã tồn tại trong hệ thống' } : null;
          })
        );
    } else if (control == emailControl && (isAdd || (originValue && emailControl.value !== originValue.email))) { // trường hợp nhập email
      return personService.getPersonByNameAndEmail({
        id: idControl.value,
        email: emailControl.value
      }) // check trùng tên
        .pipe(debounceTime(200), distinctUntilChanged()).pipe(
          map(res => {
            console.log(`Check trùng email: { email: ${emailControl.value}}, id: ${idControl.value} }`, emailControl.value);
            if (subService != null) {
              subService.unsubscribe();
              subService = null;
            }
            console.log('END[ email unique ]');
            return res && res.length ? { emailUnique: 'Email đã tồn tại trong hệ thống' } : null;
          })
        );
    } else if (isAdd || (originValue && nameControl.value !== originValue.name && emailControl.value !== originValue.email)) { // trường hợp khác
      return personService.getPersonByNameAndEmail({
        id: idControl.value,
        name: nameControl.value,
        email: emailControl.value
      }) // check trùng tên
        .pipe(debounceTime(200), distinctUntilChanged()).pipe(
          map(res => {
            console.log(`Check trùng tên và email: { name: ${nameControl}, email: ${emailControl.value}}, id: ${idControl.value} }`, emailControl.value);
            if (subService != null) {
              subService.unsubscribe();
              subService = null;
            }
            console.log('END[ name & email unique ]');
            if (res && res.some(p => p.name === nameControl.value)) {
              nameControl.setErrors({ nameUnique: 'Tên đã tồn tại trong hệ thống' })
            }
            if (res && res.some(p => p.email === emailControl.value)) {
              emailControl.setErrors({ emailUnique: 'Email đã tồn tại trong hệ thống' })
            }
            return null;
          })
        );
    } else {
      return of(null);
    }
  };
}

// export function mustUniqueValidator(personService: PersonService, firstKey: string, primaryKey: string, secondKey?: string) {
//   return function (group: FormGroup) {
//     let subService: Subscription = null;
//     // switch add or edit unique check
//     if (group.controls[primaryKey] && group.controls[primaryKey].value) {
//       // case edit check
//       if (group.controls[firstKey].value && group.controls[secondKey].value) {
//         subService = personService.getPersonByNameAndEmail(group.controls[firstKey].value, group.controls[secondKey].value)
//           .pipe(debounceTime(200), distinctUntilChanged()).subscribe(res => {
//             console.log('edit check....');
//             if (res && res.length) {
//               group.controls[firstKey].setErrors({
//                 unique: 'Email is existed on systems with id ' + group.controls[primaryKey].value
//               });
//             }
//             if (subService != null) {
//               subService.unsubscribe();
//               subService = null;
//             }
//           });
//       }
//       group.controls[firstKey].setErrors(null);
//     } else {
//       // case add check
//       if (group.controls[firstKey].value && group.controls[secondKey].value) {
//         subService = personService.getPersonByNameAndEmail(group.controls[firstKey].value, group.controls[secondKey].value)
//           .pipe(debounceTime(200), distinctUntilChanged()).subscribe(res => {
//             console.log('add check....');
//             if (res && res.length) {
//               group.controls[firstKey].setErrors({
//                 unique: 'Email is existed on systems'
//               });
//             }
//             if (subService != null) {
//               subService.unsubscribe();
//               subService = null;
//             }
//           });
//       }
//       group.controls[firstKey].setErrors(null);
//     }
//   };
// }