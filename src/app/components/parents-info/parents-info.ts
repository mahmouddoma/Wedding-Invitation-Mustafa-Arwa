import { Component } from '@angular/core';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-parents-info',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './parents-info.html',
  styleUrl: './parents-info.css',
})
export class ParentsInfoComponent {
  readonly config = WEDDING_CONFIG;
}
