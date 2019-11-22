import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleRecaptchaPage } from './google-recaptcha.page';

describe('GoogleRecaptchaPage', () => {
  let component: GoogleRecaptchaPage;
  let fixture: ComponentFixture<GoogleRecaptchaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleRecaptchaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleRecaptchaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
