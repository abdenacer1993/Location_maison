import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDoctorComponent } from './search-announce.component';

describe('SearchDoctorComponent', () => {
  let component: SearchDoctorComponent;
  let fixture: ComponentFixture<SearchDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
