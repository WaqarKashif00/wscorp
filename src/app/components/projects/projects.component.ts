import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  image: string;
}

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsPreviewComponent {
  projects: Project[] = [
    { title: 'COMMERCIAL BUILDING', image: '/assets/images/projects/commercial.jpg' },
    { title: 'CUSTOM HOUSE', image: '/assets/images/projects/house.jpg' },
    { title: 'KITCHEN ADDITION', image: '/assets/images/projects/kitchen.jpg' },
    { title: 'POOL HOUSE', image: '/assets/images/projects/pool.jpg' }
  ];



}