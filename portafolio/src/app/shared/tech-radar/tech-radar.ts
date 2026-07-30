import { Component, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate } from 'animejs';

interface TechMetric {
  key: string;
  label: string;
  value: number;
}

interface PolygonPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-tech-radar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-radar.html',
  styleUrls: ['./tech-radar.css'],
})
export class TechRadar implements AfterViewInit {

  @ViewChild('dataPolygon') dataPolygonRef!: ElementRef<SVGPolygonElement>;
  @ViewChild('radarCursor') cursorRef!: ElementRef<SVGCircleElement>;
  @ViewChild('wrapper') wrapperRef!: ElementRef<HTMLDivElement>;

  metrics: TechMetric[] = [
    { key: 'react',      label: 'React',      value: 70 },
    { key: 'postgres',   label: 'Postgres',   value: 55 },
    { key: 'typescript', label: 'TypeScript', value: 85 },
    { key: 'java',       label: 'Java',       value: 60 },
    { key: 'javascript', label: 'JavaScript', value: 90 },
    { key: 'firebase',   label: 'Firebase',   value: 50 },
    { key: 'netlify',    label: 'Netlify',    value: 65 },
    { key: 'spring',     label: 'Spring',     value: 60 },
    { key: 'figma',      label: 'Figma',      value: 45 },
    { key: 'vitest',     label: 'Vitest',     value: 40 },
    { key: 'playwright', label: 'Playwright', value: 35 },
    { key: 'sonarqube',  label: 'SonarQube',  value: 30 },
  ];

  size = 460;
  center = this.size / 2;
  radius = this.size / 2 - 70;

  hoveredIndex: number | null = null;
  cursorVisible = false;

  private activeIndex = 0;
  private cyclePaused = false;
  private cycleTimer: ReturnType<typeof setTimeout> | null = null;
  private currentAnim: ReturnType<typeof animate> | null = null;
  private cursorPos: PolygonPoint = { x: 0, y: 0 };
  private readonly holdDuration = 1200;
  private readonly travelDuration = 400;

  private started = false;

  constructor(private cdr: ChangeDetectorRef) {}

  get angleStep(): number {
    return (2 * Math.PI) / this.metrics.length;
  }

  private angleFor(index: number): number {
    return index * this.angleStep - Math.PI / 2;
  }

  private pointAt(index: number, distance: number): PolygonPoint {
    const angle = this.angleFor(index);
    return {
      x: this.center + distance * Math.cos(angle),
      y: this.center + distance * Math.sin(angle),
    };
  }

  get gridRings(): string[] {
    const ringLevels = [0.25, 0.5, 0.75, 1];
    return ringLevels.map((level) =>
      this.metrics
        .map((_, i) => {
          const p = this.pointAt(i, this.radius * level);
          return `${p.x},${p.y}`;
        })
        .join(' ')
    );
  }

  get axisLines(): { x1: number; y1: number; x2: number; y2: number }[] {
    return this.metrics.map((_, i) => {
      const p = this.pointAt(i, this.radius);
      return { x1: this.center, y1: this.center, x2: p.x, y2: p.y };
    });
  }

  get labelPositions(): (PolygonPoint & { label: string })[] {
    return this.metrics.map((m, i) => {
      const p = this.pointAt(i, this.radius + 28);
      return { ...p, label: m.label };
    });
  }

  get dataPoints(): (PolygonPoint & { value: number; label: string })[] {
    return this.metrics.map((m, i) => {
      const p = this.pointAt(i, (this.radius * m.value) / 100);
      return { ...p, value: m.value, label: m.label };
    });
  }

  ngAfterViewInit(): void {
    this.cursorPos = { x: this.center, y: this.center };
    this.updateCursorPosition();
  }

  /** Home lo invoca con la duración total del texto, para que ambos terminen juntos. */
  start(duration: number): void {
    if (this.started) return;
    this.started = true;
    this.wrapperRef.nativeElement.classList.add('pulse-in');
    this.animateReveal(duration);
  }

  private animateReveal(duration: number): void {
    const finalPoints = this.dataPoints;
    const progress = { value: 0 };

    animate(progress, {
      value: 1,
      duration,
      ease: 'outElastic(1, .6)',
      onUpdate: () => {
        const scaled = finalPoints
          .map((p) => {
            const x = this.center + (p.x - this.center) * progress.value;
            const y = this.center + (p.y - this.center) * progress.value;
            return `${x},${y}`;
          })
          .join(' ');
        this.dataPolygonRef.nativeElement.setAttribute('points', scaled);
      },
      onComplete: () => {
        this.startAutoCycle();
      },
    });
  }

  private startAutoCycle(): void {
    this.cursorVisible = true;
    this.activeIndex = 0;
    this.hoveredIndex = 0;
    this.cdr.detectChanges();
    this.moveCursorTo(0);
  }

  private scheduleNext(): void {
    if (this.cyclePaused) return;
    if (this.cycleTimer) clearTimeout(this.cycleTimer);
    this.cycleTimer = setTimeout(() => {
      if (this.cyclePaused) return;
      const nextIndex = (this.activeIndex + 1) % this.metrics.length;
      this.activeIndex = nextIndex;
      this.hoveredIndex = nextIndex;
      this.cdr.detectChanges();
      this.moveCursorTo(nextIndex);
    }, this.holdDuration);
  }

  private moveCursorTo(index: number): void {
    if (this.currentAnim) {
      this.currentAnim.cancel();
    }

    const target = this.dataPoints[index];
    const start = { ...this.cursorPos };

    this.currentAnim = animate(start, {
      x: target.x,
      y: target.y,
      duration: this.travelDuration,
      ease: 'outQuad',
      onUpdate: () => {
        this.cursorPos = { x: start.x, y: start.y };
        this.updateCursorPosition();
      },
      onComplete: () => {
        if (!this.cyclePaused) {
          this.scheduleNext();
        }
      },
    });
  }

  private updateCursorPosition(): void {
    if (!this.cursorRef) return;
    this.cursorRef.nativeElement.setAttribute('cx', `${this.cursorPos.x}`);
    this.cursorRef.nativeElement.setAttribute('cy', `${this.cursorPos.y}`);
  }

  onHover(index: number): void {
    this.cyclePaused = true;
    if (this.cycleTimer) clearTimeout(this.cycleTimer);

    this.activeIndex = index;
    this.hoveredIndex = index;
    this.cdr.detectChanges();

    this.moveCursorTo(index);
  }

  onSvgLeave(): void {
    if (!this.cyclePaused) return;
    this.cyclePaused = false;
    this.scheduleNext();
  }
}