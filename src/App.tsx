import React from 'react';
import './App.css';

import {
  FormGroupProvider,
  FieldControl,
  Validators,
  useFormGroup,
} from  "./lib/react-form-control";

interface State {
  text: string;
  radio: number;
  checkbox: boolean[];
  select: number;
}

const lazyInit = () => {
  return new Promise(resolve => {
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
  const checkboxes = [
    { value: "val1", checked: false },
    { value: "val2", checked: true },
    { value: "val3", checked: false },
  ];

  const formGroup = useFormGroup({
    // text: ["abc", Validators.required],
    text: ["abcd", [Validators.required, Validators.maxLength(5)]],
    radio: [1],
    checkbox: [checkboxes.filter(c => c.checked).map(c => c.value), Validators.required],
    select: [1],
  }, lazyInit);
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
      <button onClick={_e => formGroup.setValue(_dummy)} >formGroup.setValue()</button>
      <button onClick={_e => alert("can submit!")} disabled={formGroup.status === "INVALID"}>dummy submit button</button>
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
              <FieldControl name="radio" >
                {(props: any) => {
                  const { value, setValue } = props;
                  return (
                    <>
                      <label htmlFor="radio1">
                        {/* eslint-disable-next-line */}
                        <input id="radio1" type="radio" name="radio" value={1} onChange={e => setValue(e.target.value)} checked={value == 1} />
                        <span>Radio1</span>
                      </label>
                      <label htmlFor="radio2">
                        {/* eslint-disable-next-line */}
                        <input id="radio2" type="radio" name="radio" value={2} onChange={e => setValue(e.target.value)} checked={value == 2} />
                        <span>Radio2</span>
                      </label>
                      <label htmlFor="radio3">
                        {/* eslint-disable-next-line */}
                        <input id="radio3" type="radio" name="radio" value={3} onChange={e => setValue(e.target.value)} checked={value == 3} />
                        <span>Radio3</span>
                      </label>
                    </>
                  );
                }}
              </FieldControl>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Checkboxes</div>
            <div className="form__item-field">
              <FieldControl name="checkbox" >
                {(props: any) => {
                const { value: currentValue, setValue, errors } = props;
                return (
                  <>
                    {checkboxes.map(checkbox => {
                      const checked = !!(currentValue.find((v: any) => v === checkbox.value));
                      return (
                        <label key={checkbox.value}>
                          <input
                            type="checkbox"
                            value={checkbox.value}
                            checked={checked}
                            onChange={e => {
                              const { value, checked } = e.target;
                              if (checked) {
                                setValue([ ...currentValue, value ]);
                              } else {
                                setValue([ ...currentValue.filter((v: any) => v !== value ) ]);
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
              <FieldControl name="select" >
                {(props: any) => {
                const { value, setValue } = props;
                return (
                  <>
                    <select name="select" value={value} onChange={e => setValue(e.target.value)}>
                      <option value={1}>option1</option>
                      <option value={2}>option2</option>
                      <option value={3}>option3</option>
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
