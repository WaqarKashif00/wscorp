import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  title = 'WVSERVICE';

  ngAfterViewInit() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can stop observing to save resources
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Target all animation classes
    setTimeout(() => {
      const targets = document.querySelectorAll('.fade-up, .reveal-left, .scale-in');
      targets.forEach(el => observer.observe(el));
    }, 1000);
  }
}