import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

  scrolled = false;
  activeSection = 'home';
  isMobileOpen = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 10;
    this.detectActiveSection();
  }

  toggleMobileMenu(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileMenu(): void {
    this.isMobileOpen = false;
  }

  detectActiveSection(): void {
    const sections = ['home', 'about-me', 'projects', 'contact'];

    for (const section of sections) {
      const el = document.getElementById(section);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        this.activeSection = section;
        break;
      }
    }
  }

}
