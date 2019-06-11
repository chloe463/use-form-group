import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { FormGroupProvider } from "../FormGroupContext";
import { useFormGroup } from "../useFormGroup";
import { FieldControl } from "../FieldControl";

afterEach(cleanup);

const MockComponent: React.FC<{}> = () => {
  const formGroup = useFormGroup({
    values: {
      text: "",
    },
  });
  return (
    <FormGroupProvider formGroup={formGroup}>
      <FieldControl name="text">
        {({ value, setValue }) => {
          return (
            <>
              <input type="text" value={value} onChange={e => setValue(e.target.value)} data-testid="input" />;
              <span data-testid="value">{value}</span>
            </>
          );
        }}
      </FieldControl>
    </FormGroupProvider>
  );
};

describe("FieldControl", () => {
  it("renders without crashing", () => {
    const container = render(<MockComponent />);
    expect(container).toBeTruthy();
  });

  it("can changes value", () => {
    const { getByTestId } = render(<MockComponent />);
    const input = getByTestId("input");
    const value = getByTestId("value");
    expect(value.innerHTML).toBe("");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(value.innerHTML).toBe("abc");
  });
});

const MockComponentWithoutProvider: React.FC<{}> = () => {
  return (
    <FieldControl name="text">
      {({ value, setValue }) => {
        return <input type="text" value={value} onChange={e => setValue(e.target.value)} />;
      }}
    </FieldControl>
  );
};

describe("FieldControl", () => {
  it("crashes if it is not contained by FormGroupProvider", () => {
    try {
      render(<MockComponentWithoutProvider />);
    } catch (e) {
      expect(e.message).toBe(
        'Could not find "formGroup" in context. Wrap the root component in a <FormGroupProvider>.'
      );
    }
  });
});
