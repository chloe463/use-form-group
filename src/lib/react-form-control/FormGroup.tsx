import { useState } from "react";
import { Validator } from "./Validators";
import { FormControl } from "./FormControl";

type formValue = number | string | boolean | null;

export interface GroupOptions {
  [key: string]: formValue | [formValue, Validator?] | FormControl;
}

export class FormGroup {
  public controls: { [key: string]: FormControl } = {};
  constructor(options?: GroupOptions) {
  }

  public setControl(key: string, control: FormControl): void {
    this.controls[key] = control;
  }

  public getControl(name: string): FormControl {
    return this.controls[name] || null;
  }

  public values() {
    const values: { [key: string]: any } = {};
    Object.keys(this.controls).forEach((key: string) => {
      values[key] = this.controls[key].value;
    });
    return values;
  }
}

interface FormControlHook {
  [key: string]: FormControl;
}

export function useFormGroup(formGroupOptions: GroupOptions) {
  const formGroup = new FormGroup({});
  Object.keys(formGroupOptions).forEach(key => {
    const option = formGroupOptions[key];
    if (Array.isArray(option)) {
      const [value, setValue] = useState(option[0]);
      const [touched, setTouched] = useState(false);
      const [errors, setErrors] = useState([]);
      formGroup.setControl(key, new FormControl({
        value,
        setValue,
        touched,
        setTouched,
        errors,
        setErrors,
        validator: option[1],
      }));
    } else if (option instanceof FormControl) {
      formGroup.setControl(key, option);
    } else {
      const [value, setValue] = useState(option);
      const [touched, setTouched] = useState(false);
      const [errors, setErrors] = useState([]);
      formGroup.setControl(key, new FormControl({
        value,
        setValue,
        touched,
        setTouched,
        errors,
        setErrors,
      }));
    }
  });
  return formGroup;
}
