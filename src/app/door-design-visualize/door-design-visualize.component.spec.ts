import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorDesignVisualizeComponent } from './door-design-visualize.component';

describe('DoorDesignVisualizeComponent', () => {
  let component: DoorDesignVisualizeComponent;
  let fixture: ComponentFixture<DoorDesignVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorDesignVisualizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorDesignVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
