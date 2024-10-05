import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appAlphanumeric]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AlphanumericDirective, multi: true }
  ]
})
export class AlphanumericDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^[a-zA-Z0-9]*$/.test(value);
    return valid ? null : { alphanumeric: true };
  }
}
