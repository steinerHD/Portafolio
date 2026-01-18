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

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);

    if (element) {
      this.isMobileOpen = false;

      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const targetScroll = elementPosition + window.pageYOffset - headerOffset;
      
      this.smoothScroll(targetScroll, 600); // 600ms de duración
    }
  }

  private smoothScroll(targetScroll: number, duration: number): void {
    const startScroll = window.scrollY;
    const difference = targetScroll - startScroll;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = (timestamp - start) / duration;
      const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startScroll + difference * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

}
