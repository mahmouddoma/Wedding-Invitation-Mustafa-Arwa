import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { WEDDING_CONFIG } from '../wedding.config';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Signal-based countdown service.
 * Computes remaining time to the wedding date every second.
 */
@Injectable({ providedIn: 'root' })
export class CountdownService implements OnDestroy {
  private readonly targetDate = new Date(WEDDING_CONFIG.weddingDate).getTime();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /** Raw remaining milliseconds — updated every second */
  private readonly remaining = signal(this.calcRemaining());

  /** Computed countdown values */
  readonly countdown = computed<CountdownValues>(() => {
    const ms = this.remaining();
    if (ms <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    return {
      days: Math.floor(ms / (1000 * 60 * 60 * 24)),
      hours: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((ms % (1000 * 60)) / 1000),
      isExpired: false,
    };
  });

  constructor() {
    this.start();
  }

  private calcRemaining(): number {
    return this.targetDate - Date.now();
  }

  private start(): void {
    this.intervalId = setInterval(() => {
      this.remaining.set(this.calcRemaining());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
