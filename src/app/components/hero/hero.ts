import { Component, afterNextRender, inject, ElementRef, viewChild } from '@angular/core';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  private readonly animation = inject(AnimationService);
  readonly config = WEDDING_CONFIG;

  readonly ornamentTopLeft = viewChild<ElementRef>('ornamentTL');
  readonly ornamentTopRight = viewChild<ElementRef>('ornamentTR');
  readonly ornamentBottomLeft = viewChild<ElementRef>('ornamentBL');
  readonly ornamentBottomRight = viewChild<ElementRef>('ornamentBR');

  constructor() {
    afterNextRender(() => {
      // Floating parallax on corner ornaments
      const tl = this.ornamentTopLeft()?.nativeElement;
      const tr = this.ornamentTopRight()?.nativeElement;
      const bl = this.ornamentBottomLeft()?.nativeElement;
      const br = this.ornamentBottomRight()?.nativeElement;

      if (tl) this.animation.floatElement(tl, 5);
      if (tr) this.animation.floatElement(tr, -5);
      if (bl) this.animation.floatElement(bl, -4);
      if (br) this.animation.floatElement(br, 4);
    });
  }
}
