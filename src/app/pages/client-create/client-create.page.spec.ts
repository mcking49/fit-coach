import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreatePage } from './client-create.page';

describe('ClientCreatePage', () => {
  let component: ClientCreatePage;
  let fixture: ComponentFixture<ClientCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
