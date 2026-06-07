import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '@core/models/project.model';

const project: Project = {
  id: 3,
  title: 'Portfolio IA Générative',
  description: 'Site vitrine avec assistant IA.',
  image: 'img.png',
  technologies: ['Three.js', 'OpenAI API'],
  methodologies: ['Prompt Engineering'],
  githubUrl: 'https://github.com/x',
  liveUrl: 'https://demo.com',
};

describe('ProjectCardComponent', () => {
  let spectator: Spectator<ProjectCardComponent>;
  const createComponent = createComponentFactory(ProjectCardComponent);

  beforeEach(() => {
    spectator = createComponent({ props: { project } });
  });

  it('affiche le titre et les technologies', () => {
    expect(spectator.query('.title')).toHaveText('Portfolio IA Générative');
    expect(spectator.queryAll('.tag')).toHaveLength(2);
  });

  it('émet le projet au clic', () => {
    let emitted: Project | undefined;
    spectator.output('open').subscribe((p) => (emitted = p));

    spectator.click('.card');

    expect(emitted).toEqual(project);
  });
});
