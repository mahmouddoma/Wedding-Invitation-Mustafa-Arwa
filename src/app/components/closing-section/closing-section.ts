import { Component } from '@angular/core';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-closing-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './closing-section.html',
  styleUrl: './closing-section.css',
})
export class ClosingSectionComponent {
  readonly config = WEDDING_CONFIG;
}
