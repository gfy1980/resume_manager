import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsCompanyPage } from './tabs-company.page';

describe('TabsCompanyPage', () => {
  let component: TabsCompanyPage;
  let fixture: ComponentFixture<TabsCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
