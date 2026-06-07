import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

interface Tech {
  readonly name: string;
  readonly slug: string;
}

@Component({
  selector: 'app-tech-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-carousel.component.html',
  styleUrl: './tech-carousel.component.scss',
})
export class TechCarouselComponent implements OnInit, OnDestroy {
  readonly techs: readonly Tech[] = [
    { name: 'Angular', slug: 'angular' },
    { name: 'JavaScript', slug: 'js' },
    { name: 'TypeScript', slug: 'ts' },
    { name: 'HTML', slug: 'html' },
    { name: 'CSS', slug: 'css' },
    { name: 'SCSS', slug: 'sass' },
    { name: 'Material', slug: 'materialui' },
    { name: 'Bootstrap', slug: 'bootstrap' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'npm', slug: 'npm' },
    { name: 'Python', slug: 'python' },
    { name: 'Git', slug: 'git' },
    { name: 'GitLab', slug: 'gitlab' },
    { name: 'Jest', slug: 'jest' },
    { name: 'Spring Boot', slug: 'spring' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Linux', slug: 'linux' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'SQL', slug: 'mysql' },
  ];

  readonly active = signal(0);
  private timer: ReturnType<typeof setInterval> | undefined;

  iconUrl(slug: string): string {
    return `https://skillicons.dev/icons?i=${slug}&theme=dark`;
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.active.update((i) => (i + 1) % this.techs.length);
    }, 2200);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  offset(index: number): number {
    const len = this.techs.length;
    let diff = index - this.active();
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  }

  isActive(index: number): boolean {
    return index === this.active();
  }
}
