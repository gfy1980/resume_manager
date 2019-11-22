import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginQuitePage } from './login-quite.page';

describe('LoginQuitePage', () => {
  let component: LoginQuitePage;
  let fixture: ComponentFixture<LoginQuitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginQuitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginQuitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
