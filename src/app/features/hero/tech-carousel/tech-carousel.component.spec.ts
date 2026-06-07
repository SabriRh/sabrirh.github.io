import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { TechCarouselComponent } from './tech-carousel.component';

describe('TechCarouselComponent', () => {
  let spectator: Spectator<TechCarouselComponent>;
  const createComponent = createComponentFactory(TechCarouselComponent);

  beforeEach(() => {
    jest.useFakeTimers();
    spectator = createComponent();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('rend une carte par technologie', () => {
    expect(spectator.queryAll('.card')).toHaveLength(spectator.component.techs.length);
  });

  it('marque la première technologie comme active au départ', () => {
    expect(spectator.component.active()).toBe(0);
    expect(spectator.query('.card.active .label')).toHaveText('Angular');
  });

  it('génère une URL skill-icons avec le thème sombre', () => {
    expect(spectator.component.iconUrl('angular')).toBe(
      'https://skillicons.dev/icons?i=angular&theme=dark',
    );
  });

  it('calcule un offset circulaire signé autour de la carte active', () => {
    const last = spectator.component.techs.length - 1;
    expect(spectator.component.offset(0)).toBe(0);
    expect(spectator.component.offset(1)).toBe(1);
    // le précédent de la première carte est la dernière (wrap circulaire)
    expect(spectator.component.offset(last)).toBe(-1);
  });

  it("n'affiche que le précédent, l'actif et le suivant", () => {
    expect(spectator.queryAll('.card:not(.hidden)')).toHaveLength(3);
    expect(spectator.query('.card.active:not(.hidden)')).toExist();
  });

  it('fait défiler automatiquement la technologie active', () => {
    jest.advanceTimersByTime(2200);
    expect(spectator.component.active()).toBe(1);
    jest.advanceTimersByTime(2200);
    expect(spectator.component.active()).toBe(2);
  });

  it('boucle en revenant à la première technologie', () => {
    const total = spectator.component.techs.length;
    jest.advanceTimersByTime(2200 * total);
    expect(spectator.component.active()).toBe(0);
  });

  it("nettoie l'intervalle à la destruction", () => {
    const clearSpy = jest.spyOn(global, 'clearInterval');
    spectator.fixture.destroy();
    expect(clearSpy).toHaveBeenCalled();
  });

  it("n'expose aucun contrôle de navigation interactif", () => {
    expect(spectator.queryAll('button')).toHaveLength(0);
    expect(spectator.query('.dots')).toBeNull();
  });
});
