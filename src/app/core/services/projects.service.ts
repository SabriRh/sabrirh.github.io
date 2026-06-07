import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Project } from '../models/project.model';

interface ProjectsResponse {
  projects: Project[];
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly resource = httpResource<ProjectsResponse>(() => 'projects.json');

  readonly loading = this.resource.isLoading;
  readonly error = computed(() => this.resource.error() != null);
  readonly projects = computed(() => (this.error() ? [] : (this.resource.value()?.projects ?? [])));
}
