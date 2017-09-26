/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PercentBarComponent } from './percent-bar.component';

describe('PercentBarComponent', () => {
  let component: PercentBarComponent;
  let fixture: ComponentFixture<PercentBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
