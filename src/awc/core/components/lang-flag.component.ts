import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'awc-lang-flag',
  template: `
    <span [class]="'lang-flag ' + lang">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LangFlagComponent {
  @Input() lang: string;
}
