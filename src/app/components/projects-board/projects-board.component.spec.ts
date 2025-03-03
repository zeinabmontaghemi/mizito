import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsBoardComponent } from './projects-board.component';

describe('ProjectsBoardComponent', () => {
  let component: ProjectsBoardComponent;
  let fixture: ComponentFixture<ProjectsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
