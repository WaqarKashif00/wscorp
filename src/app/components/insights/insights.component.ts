import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Insight {
  category: string;
  title: string;
  image: string;
  theme: 'light' | 'dark';
}

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-black text-white">
      <div class="container mx-auto px-6">
        <div class="mb-20 reveal-left">
          <h2 class="text-xs font-black tracking-[0.5em] uppercase mb-6 text-accent flex items-center gap-4">
            <span class="w-12 h-[2px] bg-accent"></span>
            Latest Insights
          </h2>
          <h3 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-editorial">
            WHAT'S <br><span class="text-accent">TRENDING</span>
          </h3>
        </div>

        <!-- Accenture-Style Card Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (insight of insights; track insight.title; let i = $index) {
            <a 
              href="#"
              class="group block relative overflow-hidden reveal-left"
              [class]="'delay-' + ((i % 4) + 1)"
              [ngClass]="{
                'bg-white': insight.theme === 'light',
                'bg-[#0d0d0d]': insight.theme === 'dark'
              }">
              
              <!-- Purple Hover Overlay - Full Card -->
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-accent to-purple-900 opacity-0 group-hover:opacity-95 transition-opacity duration-500 z-20"></div>
              
              <!-- Card Content Container -->
              <div class="relative h-[500px] flex flex-col p-8">
                
                <!-- Category Label -->
                <div class="relative z-30">
                  <span class="text-[10px] font-black tracking-[0.25em] uppercase transition-colors duration-300 text-accent group-hover:text-white">
                    {{ insight.category }}
                  </span>
                </div>


                <!-- Title -->
                <div class="relative z-30 mt-4 flex-grow">
                  <h4 
                    class="text-2xl lg:text-[1.75rem] font-black leading-[1.1] tracking-tight transition-colors duration-300"
                    [ngClass]="{
                      'text-black group-hover:text-white': insight.theme === 'light',
                      'text-white': insight.theme === 'dark'
                    }">
                    {{ insight.title }}
                  </h4>
                </div>

                <!-- Image at Bottom -->
                <div class="relative z-10 mt-auto -mx-8 -mb-8">
                  <div class="relative h-[280px] overflow-hidden">
                    <img 
                      [src]="insight.image" 
                      [alt]="insight.title"
                      class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy">
                    
                    <!-- Gradient fade for dark cards -->
                    @if (insight.theme === 'dark') {
                      <div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                    }
                  </div>
                </div>

                <!-- Hover Arrow -->
                <div class="absolute bottom-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <span class="text-5xl font-light text-white">&gt;</span>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class InsightsComponent {
  insights: Insight[] = [
    {
      category: 'PERSPECTIVE',
      title: 'Sustainable MEP systems for net-zero buildings',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
      theme: 'light'
    },
    {
      category: 'CASE STUDY',
      title: 'How BIM is transforming MEP coordination',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
      theme: 'dark'
    },
    {
      category: 'INDUSTRY TRENDS',
      title: 'Smart building technology: The future of HVAC',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      theme: 'dark'
    },
    {
      category: 'RESEARCH REPORT',
      title: 'Top MEP engineering trends for 2026',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600',
      theme: 'dark'
    }
  ];

}
