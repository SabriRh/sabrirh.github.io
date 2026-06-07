import { Component } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Component({
  imports: [RevealOnScrollDirective],
  template: `<div class="target" [appReveal]="120">contenu</div>`,
})
class HostComponent {}

describe('RevealOnScrollDirective', () => {
  let observeSpy: jest.Mock;
  let triggerIntersect: (entries: Partial<IntersectionObserverEntry>[]) => void;

  const createComponent = createComponentFactory({
    component: HostComponent,
    imports: [RevealOnScrollDirective],
  });
  let spectator: Spectator<HostComponent>;

  beforeEach(() => {
    observeSpy = jest.fn();
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      constructor(cb: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        triggerIntersect = cb;
      }
      observe = observeSpy;
      unobserve = jest.fn();
      disconnect = jest.fn();
    };

    spectator = createComponent();
  });

  it('applique la classe reveal et le delay', () => {
    const el = spectator.query('.target') as HTMLElement;
    expect(el).toHaveClass('reveal');
    expect(el.style.transitionDelay).toBe('120ms');
  });

  it("observe puis ajoute is-visible à l'intersection", () => {
    const el = spectator.query('.target') as HTMLElement;
    expect(observeSpy).toHaveBeenCalled();
    expect(el).not.toHaveClass('is-visible');

    triggerIntersect([{ isIntersecting: true, target: el }]);

    expect(el).toHaveClass('is-visible');
  });
});
