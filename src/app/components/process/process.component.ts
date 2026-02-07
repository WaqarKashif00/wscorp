import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-process',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './process.component.html'
})
export class ProcessComponent {
    steps: ProcessStep[] = [
        {
            number: '01',
            title: 'CONSULTATION & DESIGN',
            description: 'We meet with new business owners and homeowners to understand their vision, providing expert architectural and structural advice from day one.'
        },
        {
            number: '02',
            title: 'PERMITTING MANAGEMENT',
            description: 'We handle the entire permitting process, navigating local regulations and building codes to ensure a seamless approval phase.'
        },
        {
            number: '03',
            title: 'TECHNICAL EXECUTION',
            description: 'Our team delivers precise MEP designs, structural drawings, and 3D models, ensuring every detail is engineered for success.'
        },
        {
            number: '04',
            title: 'FINAL DELIVERY',
            description: 'From tenant layouts to final inspections, we ensure your project is ready for business or living, meeting all quality and safety standards.'
        }
    ];
}
