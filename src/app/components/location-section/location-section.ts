import { Component, inject } from '@angular/core';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { ShareService } from '../../core/services/share.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-location-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './location-section.html',
  styleUrl: './location-section.css',
})
export class LocationSectionComponent {
  readonly config = WEDDING_CONFIG;
  private readonly shareService = inject(ShareService);

  openLocation(): void {
    this.shareService.openLocation();
  }

  shareLocation(): void {
    this.shareService.shareLocation();
  }

  copyLocationLink(): void {
    this.shareService.copyLocationLink();
  }
}
