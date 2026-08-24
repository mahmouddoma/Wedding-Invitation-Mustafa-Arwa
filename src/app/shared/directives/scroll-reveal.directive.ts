import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

/**
 * Attribute directive that applies GSAP ScrollTrigger reveal animation.
 * Usage: <div appScrollReveal [revealDelay]="0.2">...</div>
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective {
  private readonly el = inject(ElementRef);
  private readonly animation = inject(AnimationService);

  readonly revealDelay = input(0);
  readonly revealY = input(40);

  constructor() {
    afterNextRender(() => {
      this.animation.scrollReveal(this.el.nativeElement, {
        delay: this.revealDelay(),
        y: this.revealY(),
      });
    });
  }
}
