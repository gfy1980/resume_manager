import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfirmationFinishPage } from './account-confirmation-finish.page';

describe('AccountConfirmationFinishPage', () => {
  let component: AccountConfirmationFinishPage;
  let fixture: ComponentFixture<AccountConfirmationFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountConfirmationFinishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConfirmationFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
