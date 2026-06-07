import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let spectator: Spectator<HeroComponent>;
  const createComponent = createComponentFactory(HeroComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('rend le nom complet', () => {
    expect(spectator.query('.given')).toHaveText('Sabri');
    expect(spectator.query('.family')).toHaveText('Rhaimia');
  });

  it('rend le titre Web Developer / Tech Lead', () => {
    expect(spectator.query('.kicker')).toContainText('Web Developer');
    expect(spectator.query('.kicker')).toContainText('Tech Lead');
  });

  it('rend les compétences clés', () => {
    const roles = spectator.queryAll('.role').map((el) => el.textContent?.trim());
    expect(roles).toEqual(['Angular', 'Node', 'UI/UX', 'Accessibilité']);
  });

  it('défile vers la section projets au clic du CTA', () => {
    const target = document.createElement('div');
    target.id = 'projects';
    const scrollSpy = jest.fn();
    target.scrollIntoView = scrollSpy;
    document.body.appendChild(target);

    spectator.click('.cta');

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    target.remove();
  });
});
