import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSettings2Component } from './card-settings2.component';

describe('CardSettings2Component', () => {
  let component: CardSettings2Component;
  let fixture: ComponentFixture<CardSettings2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSettings2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSettings2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
