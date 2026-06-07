import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProjectModalComponent } from './project-modal.component';
import { Project } from '@core/models/project.model';

const project: Project = {
  id: 2,
  title: 'Application Mobile E-commerce',
  description: 'App cross-platform.',
  image: 'img.png',
  technologies: ['React Native'],
  methodologies: ['Mobile First'],
  githubUrl: 'https://github.com/x',
  liveUrl: 'https://demo.com',
};

describe('ProjectModalComponent', () => {
  let spectator: Spectator<ProjectModalComponent>;
  const createComponent = createComponentFactory(ProjectModalComponent);

  it("n'affiche rien sans projet", () => {
    spectator = createComponent({ props: { project: null } });
    expect(spectator.query('.modal')).toBeNull();
  });

  it('affiche le contenu du projet sélectionné', () => {
    spectator = createComponent({ props: { project } });
    expect(spectator.query('.title')).toHaveText('Application Mobile E-commerce');
    expect(spectator.query('[role="dialog"]')).toHaveAttribute('aria-modal', 'true');
  });

  it('émet la fermeture au clic sur le bouton close', () => {
    spectator = createComponent({ props: { project } });
    const closeSpy = jest.fn();
    spectator.output('close').subscribe(closeSpy);

    spectator.click('.close');

    expect(closeSpy).toHaveBeenCalled();
  });

  it('émet la fermeture sur la touche Échap', () => {
    spectator = createComponent({ props: { project } });
    const closeSpy = jest.fn();
    spectator.output('close').subscribe(closeSpy);

    spectator.dispatchKeyboardEvent(document, 'keydown', 'Escape');

    expect(closeSpy).toHaveBeenCalled();
  });
});
