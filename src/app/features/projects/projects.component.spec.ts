import { signal } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project.model';

const project: Project = {
  id: 1,
  title: 'Plateforme SaaS',
  description: 'Tableau de bord analytique.',
  image: 'img.png',
  technologies: ['Angular', 'NestJS'],
  methodologies: ['Agile'],
  githubUrl: 'https://github.com/x',
  liveUrl: 'https://demo.com',
};

describe('ProjectsComponent', () => {
  let spectator: Spectator<ProjectsComponent>;

  const loading = signal(false);
  const error = signal(false);
  const projects = signal<Project[]>([project]);

  const createComponent = createComponentFactory({
    component: ProjectsComponent,
    providers: [{ provide: ProjectsService, useValue: { loading, error, projects } }],
  });

  beforeEach(() => {
    loading.set(false);
    error.set(false);
    projects.set([project]);
    spectator = createComponent();
  });

  it('affiche une carte par projet', () => {
    expect(spectator.queryAll('app-project-card')).toHaveLength(1);
  });

  it("affiche l'état de chargement", () => {
    loading.set(true);
    spectator.detectChanges();
    expect(spectator.query('.state')).toContainText('Chargement');
    expect(spectator.queryAll('app-project-card')).toHaveLength(0);
  });

  it("affiche l'état d'erreur", () => {
    error.set(true);
    spectator.detectChanges();
    expect(spectator.query('.state')).toContainText('Impossible');
  });

  it('sélectionne un projet et verrouille le défilement du body', () => {
    spectator.component.select(project);
    spectator.detectChanges();
    expect(spectator.component.selected()).toEqual(project);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('ferme la modale et restaure le défilement', () => {
    spectator.component.select(project);
    spectator.component.closeModal();
    expect(spectator.component.selected()).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});
