import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProgressListComponent } from './projects-progress-list.component';

describe('ProjectsProgressListComponent', () => {
  let component: ProjectsProgressListComponent;
  let fixture: ComponentFixture<ProjectsProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsProgressListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
