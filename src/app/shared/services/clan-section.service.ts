import { Injectable, signal } from '@angular/core';
import { ClanSection } from '@clans/interfaces/clan-section.interfaces';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClanSectionService {
  activeSection = signal<number>(1);

  clans = Object.values(Watermark);

  constructor() { }

  setActiveSection(id: number): void {
    this.activeSection.set(id);
  }

  nextSection(sections: ClanSection[]): void {
    if (this.activeSection() < sections.length) {
      this.activeSection.update(current => current + 1);
    }
  }

  previousSection(): void {
    if (this.activeSection() > 1) {
      this.activeSection.update(current => current - 1);
    }
  }
}
