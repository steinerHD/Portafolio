import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  line1 = '';
  line2 = '';
  line3 = '';

  private texts = ['Welcome', 'To my', 'Portfolio'];
  private speed = 100;

  currentLine = 0;
  isTypingComplete = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.typeText(0, 0);
  }

  private typeText(lineIndex: number, charIndex: number): void {
    if (lineIndex >= this.texts.length) {
      this.isTypingComplete = true;
      this.currentLine = this.texts.length - 1;
      this.cdr.detectChanges();

      // Restart after 10 seconds
      setTimeout(() => {
        this.resetTyping();
      }, 10000);

      return;
    }

    const currentText = this.texts[lineIndex];

    this.isTypingComplete = false;
    this.currentLine = lineIndex;

    if (charIndex < currentText.length) {
      this.setLine(lineIndex, currentText.substring(0, charIndex + 1));
      this.cdr.detectChanges();

      setTimeout(() => {
        this.typeText(lineIndex, charIndex + 1);
      }, this.speed);

    } else {
      setTimeout(() => {
        this.typeText(lineIndex + 1, 0);
      }, 300);
    }
  }

  private setLine(index: number, value: string): void {
    if (index === 0) this.line1 = value;
    if (index === 1) this.line2 = value;
    if (index === 2) this.line3 = value;
  }

  private resetTyping(): void {
    this.line1 = '';
    this.line2 = '';
    this.line3 = '';
    this.currentLine = 0;
    this.isTypingComplete = false;
    this.cdr.detectChanges();

    // small delay before restarting
    setTimeout(() => this.typeText(0, 0), 500);
  }

  get lastIndex(): number {
    return this.texts.length - 1;
  }

}
