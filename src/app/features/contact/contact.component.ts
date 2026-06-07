import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealOnScrollDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly email = 'contact@sabrirh.dev';
  readonly year = new Date().getFullYear();
}
