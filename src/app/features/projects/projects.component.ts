import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project.model';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealOnScrollDirective, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly projectsService = inject(ProjectsService);

  readonly projects = this.projectsService.projects;
  readonly loading = this.projectsService.loading;
  readonly error = this.projectsService.error;
  readonly selected = signal<Project | null>(null);

  select(project: Project): void {
    this.selected.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selected.set(null);
    document.body.style.overflow = '';
  }
}
