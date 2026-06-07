import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { ApplicationRef } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';

const project: Project = {
  id: 1,
  title: 'Plateforme SaaS Analytics',
  description: 'Dashboard temps réel.',
  image: 'img.png',
  technologies: ['React', 'Node.js'],
  methodologies: ['Agile'],
  githubUrl: 'https://github.com/x',
  liveUrl: 'https://demo.com',
};

describe('ProjectsService', () => {
  let spectator: SpectatorService<ProjectsService>;
  let httpMock: HttpTestingController;
  const createService = createServiceFactory({
    service: ProjectsService,
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });

  let appRef: ApplicationRef;

  beforeEach(() => {
    spectator = createService();
    httpMock = spectator.inject(HttpTestingController);
    appRef = spectator.inject(ApplicationRef);
  });

  afterEach(() => httpMock.verify());

  it('charge et expose les projets depuis projects.json', async () => {
    expect(spectator.service.projects()).toEqual([]);

    appRef.tick();
    const req = httpMock.expectOne('projects.json');
    expect(req.request.method).toBe('GET');
    req.flush({ projects: [project] });
    await Promise.resolve();
    appRef.tick();

    expect(spectator.service.projects()).toEqual([project]);
    expect(spectator.service.error()).toBe(false);
  });

  it('passe en erreur si la requête échoue', async () => {
    appRef.tick();
    const req = httpMock.expectOne('projects.json');
    req.flush('boom', { status: 500, statusText: 'Server Error' });
    await Promise.resolve();
    appRef.tick();

    expect(spectator.service.error()).toBe(true);
    expect(spectator.service.projects()).toEqual([]);
  });
});
