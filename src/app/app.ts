import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuroraBgComponent } from './layout/aurora-bg/aurora-bg.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuroraBgComponent, HeaderComponent, HeroComponent, ProjectsComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
