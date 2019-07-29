import { Directive, ElementRef, OnInit, Self, Input, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formatable]'
})
export class FormatableInputDirective implements OnInit {
  @Input() regex: RegExp;

  private element: any;

  constructor(
    private elementRef: ElementRef,
    @Self() @Optional() private ngControl: NgControl,
  ) { }

  ngOnInit() {
    this.element = this.elementRef.nativeElement;
  }

  @HostListener('input') convert() {
    const converted = this.element.value.replace(this.regex, '');
    this.element.value = converted;
    if (this.ngControl) {
      this.ngControl.control.setValue(converted);
    }
  }
}
