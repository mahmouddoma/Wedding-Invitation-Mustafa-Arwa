import {
  Component,
  inject,
  ElementRef,
  viewChildren,
  effect,
} from '@angular/core';
import { CountdownService } from '../../core/services/countdown.service';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './countdown-timer.html',
  styleUrl: './countdown-timer.css',
})
export class CountdownTimerComponent {
  readonly countdownService = inject(CountdownService);
  private readonly animation = inject(AnimationService);
  readonly countdown = this.countdownService.countdown;

  readonly digitBoxes = viewChildren<ElementRef>('digitBox');

  private prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

  constructor() {
    effect(() => {
      const c = this.countdown();
      const boxes = this.digitBoxes();

      // Pulse animation on value changes
      if (boxes.length === 4) {
        if (c.seconds !== this.prevValues.seconds && boxes[3]) {
          this.animation.pulseDigit(boxes[3].nativeElement);
        }
        if (c.minutes !== this.prevValues.minutes && boxes[2]) {
          this.animation.pulseDigit(boxes[2].nativeElement);
        }
        if (c.hours !== this.prevValues.hours && boxes[1]) {
          this.animation.pulseDigit(boxes[1].nativeElement);
        }
        if (c.days !== this.prevValues.days && boxes[0]) {
          this.animation.pulseDigit(boxes[0].nativeElement);
        }
      }

      this.prevValues = { days: c.days, hours: c.hours, minutes: c.minutes, seconds: c.seconds };
    });
  }

  /** Format numbers with zero-padding (e.g., 04 instead of 4) */
  formatNum(num: number): string {
    return String(Math.max(0, num)).padStart(2, '0');
  }
}
