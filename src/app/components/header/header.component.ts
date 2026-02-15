import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgIf],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user$ = this.authService.user$;

  isMenuOpen = false;
  isScrolled = false;
  isHomePage = true;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
    });
    // Initial check
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  async onLogout() {
    await this.authService.logout();
    if (this.isMenuOpen) this.toggleMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}