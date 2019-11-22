import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcardBackPage } from './idcard-back.page';

describe('IdcardBackPage', () => {
  let component: IdcardBackPage;
  let fixture: ComponentFixture<IdcardBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcardBackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcardBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
