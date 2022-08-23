import { Directive, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[myTooltip]',
  providers: [MatTooltip],
})
export class MyTooltipDirective {
  tooltip: MatTooltip;

  @Input('myTooltip') myTooltip: string;

  constructor(tooltip: MatTooltip) {
    this.tooltip = tooltip;
  }

  @HostListener('mouseover') mouseover() {
    this.tooltip.message = this.myTooltip;
    this.tooltip.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip.hide();
  }
}
