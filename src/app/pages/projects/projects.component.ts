import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  image: string;
  description: string;
  details: {
    location: string;
    area: string;
    year: string;
  };
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Commercial Office Hub',
      image: '/assets/images/projects/commercial.jpg',
      description: 'Strategic commercial development focused on efficiency and modern aesthetics.',
      details: {
        location: 'Falls Church, VA',
        area: '12,000 sq ft',
        year: '2024'
      }
    },
    {
      title: 'Custom Residential House',
      image: '/assets/images/projects/house.jpg',
      description: 'A bespoke residential masterpiece blending luxury with structural integrity.',
      details: {
        location: 'Fort Washington, MD',
        area: '5,500 sq ft',
        year: '2023'
      }
    },
    {
      title: 'Gourmet Kitchen Addition',
      image: '/assets/images/projects/kitchen.jpg',
      description: 'State-of-the-art kitchen expansion featuring top-tier MEP and interior finishes.',
      details: {
        location: 'Woodbridge, VA',
        area: '600 sq ft',
        year: '2024'
      }
    },
    {
      title: 'Luxury Pool House',
      image: '/assets/images/projects/pool.jpg',
      description: 'Immersive outdoor living structure with complex structural and light commercial components.',
      details: {
        location: 'Manassas, VA',
        area: '1,200 sq ft',
        year: '2023'
      }
    }
  ];



}