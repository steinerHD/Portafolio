import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { animate, scrambleText } from 'animejs';
import { TechRadar } from '../../shared/tech-radar/tech-radar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TechRadar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {

  @ViewChild(TechRadar) techRadar!: TechRadar;

  // Duración de cada línea del scramble. Ajustá este número si el radar
  // termina antes o después del texto al probarlo en el navegador.
  private readonly lineDuration = 900;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const lines = this.el.nativeElement.querySelectorAll<HTMLElement>('.scramble-line');
    const systemText = this.el.nativeElement.querySelector<HTMLElement>('.system-text');

    lines.forEach((line, i) => {
      line.style.opacity = i === 0 ? '1' : '0';
    });

    if (systemText) {
      systemText.style.opacity = '0';
      systemText.classList.remove('animate-pulse');
    }

    const totalDuration = lines.length * this.lineDuration;

    // El radar arranca a la par del texto, no cuando el texto termina.
    this.techRadar.start(totalDuration);

    this.playSequence(lines, systemText);
  }

  private playSequence(lines: NodeListOf<HTMLElement>, systemText: HTMLElement | null): void {
    const playLine = (index: number): void => {
      if (index >= lines.length) {
        if (systemText) {
          systemText.style.opacity = '1';
          systemText.classList.add('animate-pulse');
        }
        // Sin setTimeout, sin loop. Termina acá.
        return;
      }

      lines[index].style.opacity = '1';

      animate(lines[index], {
        innerHTML: scrambleText({
          chars: 'uppercase',
          from: 'left',
          revealRate: 8,
          settleRate: 40,
          settleDuration: 250,
        }),
        duration: this.lineDuration,
        onComplete: () => playLine(index + 1),
      });
    };

    playLine(0);
  }
}