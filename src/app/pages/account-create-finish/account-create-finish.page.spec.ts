import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateFinishPage } from './account-create-finish.page';

describe('AccountCreateFinishPage', () => {
  let component: AccountCreateFinishPage;
  let fixture: ComponentFixture<AccountCreateFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreateFinishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
