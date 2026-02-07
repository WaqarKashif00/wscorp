import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html'
})
export class ServicesPreviewComponent {
  services: Service[] = [
    {
      title: 'ARCHITECTURAL DESIGNS',
      description: 'Comprehensive architectural planning for new constructions, remodels, and large-scale additions.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '3D MODELING',
      description: 'High-fidelity 3D renderings and visualizations to bring your concept to life before construction starts.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'STRUCTURAL DRAWINGS',
      description: 'Expert structural engineering and specialized drawing services ensuring buildings exceed safety codes.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
    },




    {
      title: 'MEP DESIGNS',
      description: 'Integrated Mechanical, Electrical, and Plumbing engineering solutions for complex building systems.',
      image: 'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'TENANT LAYOUTS',
      description: 'Custom light building tenant layouts and space optimization for new business owners and retail spaces.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'PERMITTING PROCESS',
      description: 'Complete building permit management, navigating complex regulations to get your project moving faster.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    }




  ];



}