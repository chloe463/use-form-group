import { FormGroup, GroupOptions } from "./FormGroup";

export class FormBuilder {
  static group(option: GroupOptions) {
    return new FormGroup(option);
  }
}
