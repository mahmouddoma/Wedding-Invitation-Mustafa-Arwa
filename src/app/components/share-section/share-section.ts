import { Component, inject } from '@angular/core';
import { ShareService } from '../../core/services/share.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-share-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './share-section.html',
  styleUrl: './share-section.css',
})
export class ShareSectionComponent {
  private readonly shareService = inject(ShareService);

  shareWhatsApp(): void {
    this.shareService.shareWhatsApp();
  }

  shareFacebook(): void {
    this.shareService.shareFacebook();
  }

  shareX(): void {
    this.shareService.shareX();
  }

  shareInstagram(): void {
    this.shareService.copyLink();
  }

  shareTikTok(): void {
    this.shareService.copyLink();
  }

  copyLink(): void {
    this.shareService.copyLink();
  }

  shareNative(): void {
    this.shareService.shareNative();
  }
}
