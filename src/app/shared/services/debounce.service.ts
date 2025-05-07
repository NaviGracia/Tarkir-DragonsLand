import { Injectable } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebounceService {
  private searchSubject = new Subject<string>();

  constructor() {}

  setup(callback: (value: string) => void, delay: number = 500) {
    return this.searchSubject.pipe(
      debounceTime(delay),
      distinctUntilChanged()
    ).subscribe(value => {
      callback(value);
    });
  }

  next(value: string) {
    this.searchSubject.next(value);
  }

  destroy() {
    this.searchSubject.complete();
  }
}
