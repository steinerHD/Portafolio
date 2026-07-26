import { Component, AfterViewInit, ElementRef } from '@angular/core';
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

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const lines = this.el.nativeElement.querySelectorAll<HTMLElement>('.scramble-line');
    const systemText = this.el.nativeElement.querySelector<HTMLElement>('.system-text');

    lines.forEach((line, i) => {
      line.style.opacity = i === 0 ? '1' : '0';
    });

    if (systemText) {
      systemText.style.opacity = '0';
      systemText.classList.remove('animate-pulse'); // por si acaso
    }

    this.playSequence(lines, systemText);
  }

  private playSequence(lines: NodeListOf<HTMLElement>, systemText: HTMLElement | null): void {
    const playLine = (index: number): void => {
      if (index >= lines.length) {
        if (systemText) {
          systemText.style.opacity = '1';
          systemText.classList.add('animate-pulse'); // recién ahora se le agrega el pulso
        }

        setTimeout(() => {
          if (systemText) {
            systemText.classList.remove('animate-pulse'); // lo quitamos antes de ocultar
            systemText.style.opacity = '0';
          }
          lines.forEach((line, i) => {
            line.style.opacity = i === 0 ? '1' : '0';
          });
          playLine(0);
        }, 8000);
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
        onComplete: () => playLine(index + 1),
      });
    };

    playLine(0);
  }
}