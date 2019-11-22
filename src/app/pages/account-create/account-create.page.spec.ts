import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatePage } from './account-create.page';

describe('AccountCreatePage', () => {
  let component: AccountCreatePage;
  let fixture: ComponentFixture<AccountCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
