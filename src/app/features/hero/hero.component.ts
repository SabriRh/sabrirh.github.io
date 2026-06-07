import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TechCarouselComponent } from './tech-carousel/tech-carousel.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechCarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly roles = ['Angular', 'Node', 'UI/UX', 'Accessibilité'];

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
