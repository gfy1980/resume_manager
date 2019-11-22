import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountPage } from './company-account.page';

describe('CompanyAccountPage', () => {
  let component: CompanyAccountPage;
  let fixture: ComponentFixture<CompanyAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
