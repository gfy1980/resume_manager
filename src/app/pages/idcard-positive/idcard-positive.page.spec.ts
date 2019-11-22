import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcardPositivePage } from './idcard-positive.page';

describe('IdcardPositivePage', () => {
  let component: IdcardPositivePage;
  let fixture: ComponentFixture<IdcardPositivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcardPositivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcardPositivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
