import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullSheetComponent } from './pull-sheet.component';

describe('PullSheetComponent', () => {
  let component: PullSheetComponent;
  let fixture: ComponentFixture<PullSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PullSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PullSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
