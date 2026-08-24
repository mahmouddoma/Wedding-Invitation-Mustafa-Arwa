import { Component, inject } from '@angular/core';
import { IcsService } from '../../core/services/ics.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-add-to-calendar',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './add-to-calendar.html',
  styleUrl: './add-to-calendar.css',
})
export class AddToCalendarComponent {
  private readonly icsService = inject(IcsService);

  downloadCalendar(): void {
    this.icsService.downloadIcs();
  }
}
