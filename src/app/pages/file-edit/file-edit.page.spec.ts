import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditPage } from './file-edit.page';

describe('FileEditPage', () => {
  let component: FileEditPage;
  let fixture: ComponentFixture<FileEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
