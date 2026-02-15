import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html'
})
export class ProjectsPreviewComponent {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getHomepageProjects();
  }
}