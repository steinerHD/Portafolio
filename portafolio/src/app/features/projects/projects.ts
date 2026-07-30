import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements AfterViewInit {
  selectedImage: string | null = null;

  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

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

  scrollCarousel(direction: 1 | -1): void {
    const track = this.trackRef.nativeElement;
    const step = track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  }

  openImage(image: string) {
    this.selectedImage = image;
  }

  closeImage() {
    this.selectedImage = null;
  }
}