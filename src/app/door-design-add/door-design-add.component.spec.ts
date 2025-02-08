import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorDesignAddComponent } from './door-design-add.component';

describe('DoorDesignAddComponent', () => {
  let component: DoorDesignAddComponent;
  let fixture: ComponentFixture<DoorDesignAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorDesignAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorDesignAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
