import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Observable, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  projects$: Observable<Project[]> = this.projectService.getPublishedProjects().pipe(
    tap(projects => console.log('Public projects loaded:', projects.length, projects)),
    catchError(err => {
      console.error('Error loading public projects:', err);
      return of([]);
    })
  );

  ngOnInit(): void { }
}