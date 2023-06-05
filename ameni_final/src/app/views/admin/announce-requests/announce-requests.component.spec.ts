import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceRequestsComponent } from './announce-requests.component';

describe('AnnouceRequestsComponent', () => {
  let component: AnnounceRequestsComponent;
  let fixture: ComponentFixture<AnnounceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnounceRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
