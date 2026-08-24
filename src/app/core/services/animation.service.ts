import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

/**
 * Centralized GSAP animation service.
 * Registers plugins once, provides reusable animation helpers,
 * and respects prefers-reduced-motion.
 */
@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  /** Check if user prefers reduced motion */
  get prefersReducedMotion(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Register GSAP plugins (called once) */
  init(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    this.initialized = true;
  }

  /** Scroll-reveal animation for an element */
  scrollReveal(element: HTMLElement, options?: { delay?: number; y?: number; duration?: number }): void {
    if (this.prefersReducedMotion || !isPlatformBrowser(this.platformId)) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    this.init();

    gsap.fromTo(
      element,
      { opacity: 0, y: options?.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  /** Digit pulse animation for countdown changes */
  pulseDigit(element: HTMLElement): void {
    if (this.prefersReducedMotion || !isPlatformBrowser(this.platformId)) return;
    gsap.fromTo(
      element,
      { scale: 1.15 },
      { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }

  /** Subtle floating animation for floral ornaments */
  floatElement(element: HTMLElement, amplitude = 6): void {
    if (this.prefersReducedMotion || !isPlatformBrowser(this.platformId)) return;
    this.init();
    gsap.to(element, {
      y: amplitude,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}
