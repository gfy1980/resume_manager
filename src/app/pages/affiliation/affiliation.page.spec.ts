import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationPage } from './affiliation.page';

describe('AffiliationPage', () => {
  let component: AffiliationPage;
  let fixture: ComponentFixture<AffiliationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
