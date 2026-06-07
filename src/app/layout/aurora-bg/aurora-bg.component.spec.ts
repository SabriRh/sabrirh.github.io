import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AuroraBgComponent } from './aurora-bg.component';

describe('AuroraBgComponent', () => {
  let spectator: Spectator<AuroraBgComponent>;
  const createComponent = createComponentFactory(AuroraBgComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('rend les calques décoratifs', () => {
    expect(spectator.queryAll('.blob')).toHaveLength(2);
    expect(spectator.query('.grid')).toExist();
    expect(spectator.query('.grain')).toExist();
  });

  it('masque le décor aux lecteurs d’écran', () => {
    expect(spectator.query('.aurora')).toHaveAttribute('aria-hidden', 'true');
  });
});
