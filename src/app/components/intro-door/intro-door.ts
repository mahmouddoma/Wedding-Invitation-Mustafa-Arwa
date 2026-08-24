import {
  Component,
  output,
  signal,
  afterNextRender,
  inject,
  PLATFORM_ID,
  ElementRef,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WEDDING_CONFIG } from '../../core/wedding.config';
import { AnimationService } from '../../core/services/animation.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-intro-door',
  standalone: true,
  templateUrl: './intro-door.html',
  styleUrl: './intro-door.css',
})
export class IntroDoorComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animationService = inject(AnimationService);

  readonly config = WEDDING_CONFIG;
  readonly doorOpened = output<void>();
  readonly isOpen = signal(false);
  readonly isOpening = signal(false);
  readonly musicPlaying = signal(false);

  readonly doorWrapRef = viewChild<ElementRef>('doorWrapEl');
  readonly leftLeafRef = viewChild<ElementRef>('leftLeafEl');
  readonly rightLeafRef = viewChild<ElementRef>('rightLeafEl');
  readonly openBtnRef = viewChild<ElementRef>('openBtnEl');

  private audioEl: HTMLAudioElement | null = null;
  private userInteractionHandler: (() => void) | null = null;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      this.animationService.init();
      this.audioEl = document.getElementById('wedding-audio') as HTMLAudioElement;

      // Pulse lock animation
      const openBtn = this.openBtnRef()?.nativeElement;
      if (openBtn && !this.animationService.prefersReducedMotion) {
        gsap.to(openBtn, {
          y: -4,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      // Try autoplay on page load
      this.attemptAutoPlay();
    });
  }

  private attemptAutoPlay(): void {
    if (!this.audioEl) return;

    // Try playing immediately
    this.audioEl
      .play()
      .then(() => {
        this.musicPlaying.set(true);
      })
      .catch(() => {
        // Browser blocked silent autoplay — attach one-time listener to window
        this.userInteractionHandler = () => {
          if (this.audioEl && !this.musicPlaying()) {
            this.audioEl
              .play()
              .then(() => {
                this.musicPlaying.set(true);
              })
              .catch(() => {});
          }
          this.removeInteractionListener();
        };

        window.addEventListener('click', this.userInteractionHandler, { once: true });
        window.addEventListener('touchstart', this.userInteractionHandler, { once: true });
      });
  }

  private removeInteractionListener(): void {
    if (this.userInteractionHandler) {
      window.removeEventListener('click', this.userInteractionHandler);
      window.removeEventListener('touchstart', this.userInteractionHandler);
      this.userInteractionHandler = null;
    }
  }

  /** Step: User taps the lock -> Unlocks, Arch opens in 3D, preview revealed, music plays */
  openDoor(): void {
    if (this.isOpen() || this.isOpening()) return;

    this.isOpening.set(true);

    // Ensure audio is playing
    if (this.audioEl && !this.musicPlaying()) {
      this.audioEl
        .play()
        .then(() => {
          this.musicPlaying.set(true);
        })
        .catch(() => {});
    }

    if (this.animationService.prefersReducedMotion) {
      this.isOpen.set(true);
      this.doorOpened.emit();
      return;
    }

    // After the door opening sequence completes (approx 2s), transition to main page
    setTimeout(() => {
      this.isOpen.set(true);
      this.doorOpened.emit();
    }, 2000);
  }

  /** Toggle background music */
  toggleMusic(): void {
    if (!this.audioEl) return;
    if (this.musicPlaying()) {
      this.audioEl.pause();
      this.musicPlaying.set(false);
    } else {
      this.audioEl.play().catch(() => {});
      this.musicPlaying.set(true);
    }
  }

  ngOnDestroy(): void {
    this.removeInteractionListener();
  }
}
