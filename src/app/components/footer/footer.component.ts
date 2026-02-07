import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-charcoal text-white pt-32 pb-20 relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div class="col-span-1 lg:col-span-1">
            <a routerLink="/" class="flex items-center group gap-4 mb-10">
              <div class="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" class="h-10 w-10 text-white">
                  <path d="M5 20 L30 85 L50 40 L70 85 L95 20" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="miter"/>
                  <path d="M30 20 L50 65 L70 20" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linejoin="miter" class="opacity-80"/>
                </svg>
              </div>
              <div class="flex flex-col leading-none">
                <span class="text-3xl font-black text-white tracking-tighter">WV</span>
                <span class="text-[10px] font-bold text-accent tracking-[0.4em] uppercase">Services Corp</span>
              </div>
            </a>
            <p class="text-gray-400 text-lg leading-tight tracking-tight max-w-xs mb-10">
              Transforming businesses and landscapes through innovative engineering and 360&deg; value creation.
            </p>
          </div>
          
          <div>
            <h5 class="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-accent">Capabilities</h5>
            <ul class="space-y-6 text-sm font-bold uppercase tracking-widest text-gray-500">
              <li><a href="#" class="hover:text-white transition-colors">Digital Core</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Cloud First</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Engineering</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Project Mgmt</a></li>
            </ul>
          </div>

          <div>
            <h5 class="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-accent">Insights</h5>
            <ul class="space-y-6 text-sm font-bold uppercase tracking-widest text-gray-500">
              <li><a href="#" class="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Innovation Lab</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Locations</a></li>
            </ul>
          </div>

          <div>
            <h5 class="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-accent">Connect</h5>
            <div class="flex gap-8 mb-10">
              <a href="#" class="text-gray-500 hover:text-accent transition-colors">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-accent transition-colors">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
            <button class="w-full bg-accent text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">Contact Us</button>
          </div>
        </div>
        
        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div class="flex flex-wrap gap-10 text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
            <a href="#" class="hover:text-white transition-colors">Terms</a>
            <a href="#" class="hover:text-white transition-colors">Cookies</a>
            <a href="#" class="hover:text-white transition-colors">Accessibility</a>
          </div>
          <p class="text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em]">&copy; 2026 WV SERVICES CORP. 360 DEGREE VALUE.</p>

        </div>
      </div>

      <div class="absolute bottom-[-15%] right-[-5%] opacity-5 pointer-events-none select-none">
        <div class="text-[25rem] font-black leading-none text-accent">&gt;</div>
      </div>
    </footer>


  `
})
export class FooterComponent { }