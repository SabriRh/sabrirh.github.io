import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory(HeaderComponent);

  beforeEach(() => {
    jest.useFakeTimers();
    spectator = createComponent();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('affiche le lien de marque vers le hero', () => {
    expect(spectator.query('.brand')).toHaveAttribute('href', '#hero');
  });

  it('affiche les liens de navigation externes', () => {
    const links = spectator.queryAll('.nav a');
    expect(links.map((l) => l.textContent?.trim())).toEqual(['GitHub', 'LinkedIn']);
  });

  it("initialise l'horloge au format HH:MM:SS", () => {
    expect(spectator.component.clock()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("met à jour l'horloge chaque seconde", () => {
    const first = spectator.component.clock();
    const updateSpy = jest.spyOn(spectator.component.clock, 'set');
    jest.advanceTimersByTime(1000);
    expect(updateSpy).toHaveBeenCalled();
    expect(spectator.component.clock()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    expect(typeof first).toBe('string');
  });

  it("nettoie l'intervalle à la destruction", () => {
    const clearSpy = jest.spyOn(global, 'clearInterval');
    spectator.fixture.destroy();
    expect(clearSpy).toHaveBeenCalled();
  });
});
