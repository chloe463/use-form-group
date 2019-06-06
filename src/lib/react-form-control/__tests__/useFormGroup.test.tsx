import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { FormGroupProvider } from "../FormGroupContext";
import { initMeta, initValidators, useFormGroup } from "../useFormGroup";
import { Validators } from "../Validators";
import { FieldControl } from "../FieldControl";

afterEach(cleanup);

describe("initMeta", () => {
  it("initializes meta values", () => {
    const values = {
      num: 1,
      str: "string",
      bool: true,
    };
    const actual = initMeta(values);
    const expected = {
      num: { pristine: true, dirty: false, touched: false, untouched: true },
      str: { pristine: true, dirty: false, touched: false, untouched: true },
      bool: { pristine: true, dirty: false, touched: false, untouched: true },
    };
    expect(actual).toEqual(expected);
  });
});

describe("initValidators", () => {
  it("initializes validators", () => {
    const values = {
      num: [Validators.max(5)],
      str: [Validators.maxLength(3)],
      bool: [Validators.required],
    };
    const actual = initValidators(values);
    expect(actual.validators).toBeTruthy();
    expect(Object.keys(actual.validators).length).toBe(3);
    expect(Object.keys(actual.validators)).toEqual(["num", "str", "bool"]);
    expect(Object.values(actual.validators).length).toBe(3);
    Object.values(actual.validators).forEach(validator => {
      expect(validator).toBeInstanceOf(Function);
    });
  });
});

const MockComponent = () => {
  const formGroup = useFormGroup({
    values: {
      num: 0,
    },
    validators: {
      num: Validators.max(5),
    },
  });

  return (
    <FormGroupProvider formGroup={formGroup}>
      <div data-testid="status">{formGroup.status}</div>
      <FieldControl name="num">
        {({ value, setValue, errors, touched }) => {
          return (
            <>
              <input type="number" value={value} onChange={e => setValue(e.target.value)} data-testid="input" />
              <span data-testid="value">{value}</span>
              <span data-testid="errors">{JSON.stringify(errors)}</span>
              <span data-testid="touched">{JSON.stringify(touched)}</span>
            </>
          );
        }}
      </FieldControl>
    </FormGroupProvider>
  );
};

describe("useFormGroup", () => {
  it("can render initial values", () => {
    const { getByTestId } = render(<MockComponent />);
    const value = getByTestId("value");
    const errors = getByTestId("errors");
    const touched = getByTestId("touched");
    const status = getByTestId("status");
    expect(value.innerHTML).toBe("0");
    expect(errors.innerHTML).toBe("");
    expect(touched.innerHTML).toBe("false");
    expect(status.innerHTML).toBe("VALID");
  });

  it("can set value on change event", () => {
    const { getByTestId } = render(<MockComponent />);
    const input = getByTestId("input");
    const value = getByTestId("value");
    const errors = getByTestId("errors");
    const touched = getByTestId("touched");
    const status = getByTestId("status");

    fireEvent.change(input, { target: { value: "3" } });
    expect(value.innerHTML).toBe("3");
    expect(errors.innerHTML).toBe("null");
    expect(touched.innerHTML).toBe("true");
    expect(status.innerHTML).toBe("VALID");
  });

  it("can handle validation errors", () => {
    const { getByTestId } = render(<MockComponent />);
    const input = getByTestId("input");
    const value = getByTestId("value");
    const errors = getByTestId("errors");
    const touched = getByTestId("touched");
    const status = getByTestId("status");

    fireEvent.change(input, { target: { value: "8" } });
    expect(value.innerHTML).toBe("8");
    expect(errors.innerHTML).toBe(JSON.stringify({ max: { max: 5, actualValue: "8" } }));
    expect(touched.innerHTML).toBe("true");
    expect(status.innerHTML).toBe("INVALID");
  });
});
