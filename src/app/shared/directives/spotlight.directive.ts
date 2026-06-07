import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
})
export class SpotlightDirective {
  private readonly host = inject(ElementRef<HTMLElement>);

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    const el = this.host.nativeElement as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
