import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifannonceComponent } from './popup-modifannonce.component';

describe('PopupModifannonceComponent', () => {
  let component: PopupModifannonceComponent;
  let fixture: ComponentFixture<PopupModifannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifannonceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModifannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
