import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorDesignListComponent } from './door-design-list.component';

describe('DoorDesignListComponent', () => {
  let component: DoorDesignListComponent;
  let fixture: ComponentFixture<DoorDesignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorDesignListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorDesignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
