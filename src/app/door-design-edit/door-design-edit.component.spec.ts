import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorDesignEditComponent } from './door-design-edit.component';

describe('DoorDesignEditComponent', () => {
  let component: DoorDesignEditComponent;
  let fixture: ComponentFixture<DoorDesignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorDesignEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorDesignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
