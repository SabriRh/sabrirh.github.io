import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Project } from '@core/models/project.model';
import { SpotlightDirective } from '@shared/directives/spotlight.directive';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpotlightDirective],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly open = output<Project>();

  emitOpen(): void {
    this.open.emit(this.project());
  }
}
