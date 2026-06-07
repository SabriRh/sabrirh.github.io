import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let spectator: Spectator<ContactComponent>;
  const createComponent = createComponentFactory(ContactComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it("expose un lien mailto vers l'adresse de contact", () => {
    const mail = spectator.query('a.primary');
    expect(mail).toHaveText(spectator.component.email);
    expect(mail).toHaveAttribute('href', `mailto:${spectator.component.email}`);
  });

  it('affiche les liens GitHub et LinkedIn en nouvel onglet', () => {
    const links = spectator.queryAll('.actions a:not(.primary)');
    expect(links.map((l) => l.textContent?.trim())).toEqual(['GitHub', 'LinkedIn']);
    links.forEach((l) => {
      expect(l).toHaveAttribute('target', '_blank');
      expect(l).toHaveAttribute('rel', 'noopener');
    });
  });

  it("affiche l'année courante dans le footer", () => {
    expect(spectator.query('.footer')).toContainText(String(spectator.component.year));
  });
});
