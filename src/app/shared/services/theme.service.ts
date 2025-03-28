import { effect, Injectable, signal } from '@angular/core';

const loadFromLocalStorage = () => {
  const themeFromLocalStorage = localStorage.getItem('theme') ?? '[]';
  const lastTheme = JSON.parse( themeFromLocalStorage );
  return lastTheme;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  actualTheme = signal<string>(loadFromLocalStorage());

  changeDataTheme(clan: string){
    const theme = {
      'abzan': 'forest',
      'jeskai': 'corporate',
      'sultai': 'synthwave',
      'mardu': 'dracula',
      'temur': 'autumn'
    }[clan] || 'dark';
    this.actualTheme.set(theme);
    console.log(this.actualTheme());
  }

  // LocalStorage
  saveGifsToLocalStorage = effect(() => {
    const historyTheme = JSON.stringify(this.actualTheme());
    localStorage.setItem('theme', historyTheme);
  })

}
