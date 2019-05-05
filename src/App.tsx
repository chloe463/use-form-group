import React from 'react';
import './App.css';

import {
  FormBuilder,
  FormGroup,
  FieldGroup,
  FieldControl,
  Validators,
  useFormGroup
} from  "./lib/react-form-control";

interface State {
  text: string;
  radio: number;
  checkbox: boolean[];
  select: number;
}

const App = () => {
  const formGroup = useFormGroup({
    // text: ["abc", Validators.required],
    text: ["abc", [Validators.required, Validators.maxLength(2)]],
    radio: [1],
    checkbox: null,
    select: [1],
  });

  return (
    <div className="App">
      <span>{formGroup.status}</span>
      <pre>{JSON.stringify(formGroup.errors())}</pre>
      <FieldGroup formGroup={formGroup} render={() => {
        return (
          <form className="form">
            <div className="form__item">
              <div className="form__item-label">Text field</div>
              <div className="form__item-field">
                <FieldControl name="text" render={(props: any) => {
                  return <input type="text" value={props.value} onChange={props.onChange} />;
                }}
                />
              </div>
            </div>
            <div className="form__item">
              <div className="form__item-label">Radio buttons</div>
              <div className="form__item-field">
                <FieldControl name="radio" render={(props: any) => {
                  return (
                    <>
                      <label htmlFor="radio1">
                        <input id="radio1" type="radio" name="radio" value={1} onChange={props.onChange} checked={props.value == 1} />
                        <span>Radio1</span>
                      </label>
                      <label htmlFor="radio2">
                        <input id="radio2" type="radio" name="radio" value={2} onChange={props.onChange} checked={props.value == 2} />
                        <span>Radio2</span>
                      </label>
                      <label htmlFor="radio3">
                        <input id="radio3" type="radio" name="radio" value={3} onChange={props.onChange} checked={props.value == 3} />
                        <span>Radio3</span>
                      </label>
                    </>
                  );
                }}>
                </FieldControl>
              </div>
            </div>
            <div className="form__item">
              <div className="form__item-label">Selection</div>
              <div className="form__item-field">
              <FieldControl name="select" render={(props: any) => {
                return (
                  <>
                    <select name="select" onChange={props.onChange}>
                      <option value={1}>option1</option>
                      <option value={2}>option2</option>
                      <option value={3}>option3</option>
                    </select>
                  </>
                );
              }}>
              </FieldControl>
              </div>
            </div>
          </form>
        );
      }}>
      </FieldGroup>
      <form className="form">
        <div className="form__item">
          <div className="form__item-label">Text field</div>
          <div className="form__item-field">
            <input type="text" value={undefined} />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item-label">Radio buttons</div>
          <div className="form__item-field">
            <label htmlFor="radio1">
              <input id="radio1" type="radio" name="radio" value={1} />
              <span>Radio1</span>
            </label>
            <label htmlFor="radio2">
              <input id="radio2" type="radio" name="radio" value={2} />
              <span>Radio2</span>
            </label>
            <label htmlFor="radio3">
              <input id="radio3" type="radio" name="radio" value={3} />
              <span>Radio3</span>
            </label>
          </div>
        </div>
        <div className="form__item">
          <div className="form__item-label">Checkboxes</div>
          <div className="form__item-field">
            <label htmlFor="checkbox1">
              <input id="checkbox1" type="checkbox" name="checkbox" value={1} />
              <span>Checkbox1</span>
            </label>
            <label htmlFor="checkbox2">
              <input id="checkbox2" type="checkbox" name="checkbox" value={2} />
              <span>Checkbox2</span>
            </label>
            <label htmlFor="checkbox3">
              <input id="checkbox3" type="checkbox" name="checkbox" value={3} />
              <span>Checkbox3</span>
            </label>
          </div>
        </div>
        <div className="form__item">
          <div className="form__item-label">Selection</div>
          <div className="form__item-field">
            <select name="select">
              <option value={1}>option1</option>
              <option value={2}>option2</option>
              <option value={3}>option3</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
