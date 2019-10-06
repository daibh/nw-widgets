import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConceptComponent } from './common-concept.component';

describe('CommonConceptComponent', () => {
  let component: CommonConceptComponent;
  let fixture: ComponentFixture<CommonConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
