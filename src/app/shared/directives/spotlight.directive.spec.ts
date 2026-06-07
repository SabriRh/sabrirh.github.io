import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator/jest';
import { SpotlightDirective } from './spotlight.directive';

describe('SpotlightDirective', () => {
  let spectator: SpectatorDirective<SpotlightDirective>;
  const createDirective = createDirectiveFactory(SpotlightDirective);

  beforeEach(() => {
    spectator = createDirective(`<div appSpotlight style="width:200px;height:100px"></div>`);
  });

  it('expose les coordonnées du pointeur en variables CSS relatives à l’élément', () => {
    const host = spectator.element as HTMLElement;
    jest.spyOn(host, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 20,
      width: 200,
      height: 100,
      right: 210,
      bottom: 120,
      x: 10,
      y: 20,
      toJSON: () => ({}),
    } as DOMRect);

    spectator.dispatchMouseEvent(host, 'pointermove', 60, 70);

    expect(host.style.getPropertyValue('--mx')).toBe('50px');
    expect(host.style.getPropertyValue('--my')).toBe('50px');
  });
});
