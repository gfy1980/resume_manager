import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOptionPage } from './other-option.page';

describe('OtherOptionPage', () => {
  let component: OtherOptionPage;
  let fixture: ComponentFixture<OtherOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
