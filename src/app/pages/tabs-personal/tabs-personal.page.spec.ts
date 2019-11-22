import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPersonalPage } from './tabs-personal.page';

describe('TabsPersonalPage', () => {
  let component: TabsPersonalPage;
  let fixture: ComponentFixture<TabsPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPersonalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
