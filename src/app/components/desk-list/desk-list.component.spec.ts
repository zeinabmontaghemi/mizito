import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskListComponent } from './desk-list.component';

describe('DeskListComponent', () => {
  let component: DeskListComponent;
  let fixture: ComponentFixture<DeskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
