import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  image: string;
  details: string[];
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'ARCHITECTURAL DESIGNS',
      description: 'We provide comprehensive architectural planning and design for residential and commercial spaces.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800',
      details: [
        'Concept Design',
        'Master Planning',
        'Floor Plans',
        'Exterior Elevations',
        'Additions & Remodels'
      ]
    },
    {
      title: '3D MODELING',
      description: 'Bringing designs to life with photorealistic 3D visualizations and virtual walkthroughs.',
      image: '/assets/images/3dmodel.jpg',
      details: [
        'Photorealistic Renderings',
        'VR Walkthroughs',
        'Environmental Context',
        'Material Simulations',
        'Interior Renderings'
      ]
    },
    {
      title: 'STRUCTURAL DRAWINGS',
      description: 'Expert structural engineering services ensuring stability and safety for every project.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
      details: [
        'Foundation Plans',
        'Framing Layouts',
        'Steel & Concrete Design',
        'Structural Calculations',
        'Load Bearing Analysis'
      ]
    },

    {
      title: 'MEP DESIGNS',
      description: 'Mechanical, Electrical, and Plumbing engineering specifically tailored for modern building needs.',
      image: 'assets/images/MEP.png',
      details: [
        'Mechanical Systems (HVAC)',
        'Electrical Layouts',
        'Plumbing Diagrams',
        'Energy Efficiency Analysis'
      ]
    },
    {
      title: 'TENANT LAYOUTS',
      description: 'Optimizing commercial spaces for new business owners and light building tenant layouts.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
      details: [
        'Space Planning',
        'Interior Build-outs',
        'ADA Compliance',
        'Fixture & Equipment Layout',
        'Change of Use Permits'
      ]
    },
    {
      title: 'PERMITTING PROCESS',
      description: 'Navigating the complex building permit process to ensure timely project start.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',

      details: [
        'Code Research',
        'Permit Expediting',
        'Zoning Analysis',
        'Agency Coordination',
        'Variance Applications'
      ]
    },
      {
      title: 'STEEL SHOP DRAWINGS',
      description: "Detailed fabrication drawings take the engineer's design and turn it into a reality, guiding the proper manufacture and installation of steel components on the construction site.",
      image: 'assets/images/steel-structure.jpg',
      details:[
        'Fabrication Drawings',
        'Fabrication Details',
      ]
    }

  ];



}