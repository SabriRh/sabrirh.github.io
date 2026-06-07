import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-aurora-bg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="aurora" aria-hidden="true">
      <span class="blob blob--a"></span>
      <span class="blob blob--b"></span>
      <span class="grid"></span>
      <span class="grain"></span>
    </div>
  `,
  styleUrl: './aurora-bg.component.scss',
})
export class AuroraBgComponent {}
