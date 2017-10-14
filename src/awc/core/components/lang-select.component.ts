import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'awc-lang-select',
  template: `
  <select (change)="onChangeSelection($event)">
    <option *ngFor="let lang of optionList;" [value]="lang" [selected]="lang===selectedOption">{{ lang }}</option>
  </select>
  <awc-lang-flag [lang]="selectedOption"></awc-lang-flag>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LangSelectComponent {
  @Input() optionList: string[];
  @Input() selectedOption: string;
  @Output() changeSelection = new EventEmitter<string>();

  onChangeSelection($event) {
    this.changeSelection.emit($event.target.value);
  }
}
