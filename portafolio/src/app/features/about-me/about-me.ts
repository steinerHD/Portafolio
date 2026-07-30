import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe implements AfterViewInit {

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const cards = this.el.nativeElement.querySelectorAll<HTMLElement>('.reveal-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('pulse-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  }
}