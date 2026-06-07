import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';
import { Project } from '@core/models/project.model';

@Component({
  selector: 'app-project-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
})
export class ProjectModalComponent {
  readonly project = input<Project | null>(null);
  readonly close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.project()) {
      this.close.emit();
    }
  }

  dismiss(): void {
    this.close.emit();
  }
}
