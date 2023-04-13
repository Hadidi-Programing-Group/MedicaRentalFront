import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestRentalsComponent } from './best-rentals.component';

describe('BestRentalsComponent', () => {
  let component: BestRentalsComponent;
  let fixture: ComponentFixture<BestRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestRentalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
