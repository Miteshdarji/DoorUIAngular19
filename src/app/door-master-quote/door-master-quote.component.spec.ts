import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorMasterQuoteComponent } from './door-master-quote.component';

describe('DoorMasterQuoteComponent', () => {
  let component: DoorMasterQuoteComponent;
  let fixture: ComponentFixture<DoorMasterQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorMasterQuoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorMasterQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
