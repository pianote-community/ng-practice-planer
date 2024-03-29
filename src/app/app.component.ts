import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public faHeart = faHeart;
  public version = environment.version;

  public days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public sections = ['Warm Up', 'Sight Reading', 'Songs', 'Improvisation', 'Technique'];
  public techniques = ['Arpeggios', 'Major Scale', 'Minor Scale', 'Triad Inversions', 'Diatonic Chords'];

  @ViewChild('downloadAnchor')
  public downloadAnchor: ElementRef | null = null;

  public formData = {
    ppWeekOf: null,
    ppYearOf: null
  };

  public onPrint(): void {
    window.print();
  }

  public getSecItemName(week: string, sec: string, tec: string | null = null): string {
    const name = 'ppSecItem' + week + sec.replace(' ', '') + (tec != null ? tec?.replace(' ', '') : null);
    return name;
  }

  public onSubmit(f: NgForm): void {
    const anchor = (this.downloadAnchor?.nativeElement as HTMLElement);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(f.value));
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute('download', 'data.json');
    anchor.click();
  }
}
