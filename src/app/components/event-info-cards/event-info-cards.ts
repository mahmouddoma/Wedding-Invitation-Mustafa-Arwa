import { Component } from '@angular/core';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { ShareService } from '../../core/services/share.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-event-info-cards',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './event-info-cards.html',
  styleUrl: './event-info-cards.css',
})
export class EventInfoCardsComponent {
  readonly config = WEDDING_CONFIG;

  constructor(private readonly shareService: ShareService) {}

  openLocation(): void {
    this.shareService.openLocation();
  }
}
