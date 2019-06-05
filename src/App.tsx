import React from "react";
import "./App.css";

import { FormGroupProvider, FieldControl, Validators, useFormGroup } from "./lib/react-form-control";

interface State {
  text: string;
  radio: string;
  checkbox: string[];
  select: string;
}

const lazyInit = () => {
  return new Promise<State>(resolve => {
    setTimeout(() => {
      resolve({
        text: "lazy init!!!",
        radio: "3",
        checkbox: ["val2"],
        select: "2",
      });
    }, 1500);
  });
};

const App = () => {
  const radios = [{ key: "radio1", value: "1" }, { key: "radio2", value: "2" }, { key: "radio3", value: "3" }];
  const checkboxes = [
    { value: "val1", checked: false },
    { value: "val2", checked: true },
    { value: "val3", checked: false },
  ];
  const options = [{ key: "option1", value: "1" }, { key: "option2", value: "2" }, { key: "option3", value: "3" }];

  const formGroupOptions = {
    values: {
      text: "abcd",
      radio: "1",
      checkbox: checkboxes.filter(c => c.checked).map(c => c.value),
      select: "1",
    },
    validators: {
      text: [Validators.required, Validators.maxLength(5)],
      checkbox: Validators.required,
    },
    lazyInit,
  };

  const formGroup = useFormGroup<State>(formGroupOptions);

  React.useEffect(() => {
    // eslint-disable-next-line
    console.log(formGroup.values);
  }, [formGroup.values]);
  // console.log(formGroup.values);

  const _dummy = {
    text: "updated!!!",
    radio: "2",
    checkbox: ["val1"],
    select: "3",
  };

  return (
    <div className="App">
      <button onClick={_e => formGroup.setValue(_dummy)}>formGroup.setValue()</button>
      <button onClick={_e => alert("can submit!")} disabled={formGroup.status === "INVALID"}>
        dummy submit button
      </button>
      <button onClick={_e => formGroup.reset()}>formGroup.reset()</button>
      <FormGroupProvider formGroup={formGroup}>
        <form className="form">
          <div className="form__item">
            <div className="form__item-label">Text field</div>
            <div className="form__item-field">
              <FieldControl name="text">
                {(props: any) => {
                  const { value, setValue, touched, errors } = props;
                  return (
                    <>
                      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                      {touched && errors && JSON.stringify(errors)}
                    </>
                  );
                }}
              </FieldControl>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Radio buttons</div>
            <div className="form__item-field">
              <FieldControl name="radio">
                {(props: any) => {
                  const { value, setValue } = props;
                  return (
                    <>
                      {radios.map(radio => {
                        return (
                          <label htmlFor={radio.key} key={radio.key}>
                            <input
                              id={radio.key}
                              type="radio"
                              name="radio"
                              value={radio.value}
                              onChange={e => setValue(e.target.value)}
                              checked={value === radio.value}
                            />
                            <span>Radio1</span>
                          </label>
                        );
                      })}
                    </>
                  );
                }}
              </FieldControl>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Checkboxes</div>
            <div className="form__item-field">
              <FieldControl name="checkbox">
                {(props: any) => {
                  const { value: currentValue, setValue, errors } = props;
                  return (
                    <>
                      {checkboxes.map(checkbox => {
                        const checked = !!currentValue.find((v: any) => v === checkbox.value);
                        return (
                          <label key={checkbox.value}>
                            <input
                              type="checkbox"
                              value={checkbox.value}
                              checked={checked}
                              onChange={e => {
                                const { value, checked } = e.target;
                                if (checked) {
                                  setValue([...currentValue, value]);
                                } else {
                                  setValue([...currentValue.filter((v: any) => v !== value)]);
                                }
                              }}
                            />
                            {checkbox.value}
                          </label>
                        );
                      })}
                      {errors ? JSON.stringify(errors) : null}
                    </>
                  );
                }}
              </FieldControl>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Selection</div>
            <div className="form__item-field">
              <FieldControl name="select">
                {(props: any) => {
                  const { value, setValue } = props;
                  return (
                    <>
                      <select name="select" value={value} onChange={e => setValue(e.target.value)}>
                        {options.map(option => {
                          return (
                            <option key={option.key} value={option.value}>
                              {option.key}
                            </option>
                          );
                        })}
                      </select>
                    </>
                  );
                }}
              </FieldControl>
            </div>
          </div>
        </form>
      </FormGroupProvider>
      {/* <pre>{JSON.stringify(formGroup.controls, null, 2)}</pre> */}
    </div>
  );
};

export default App;
