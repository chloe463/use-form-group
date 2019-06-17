import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FormGroupProvider } from "../FormGroupContext";
import { useFormGroup } from "../useFormGroup";
import { useFormArray } from "../useFormArray";

const MockCheckboxComponent: React.FC = () => {
  const { hasValue, addOrRemoveValue } = useFormArray("numbers");
  return (
    <>
      <input
        type="checkbox"
        value={1}
        checked={hasValue("1")}
        data-testid="checkbox1"
        onChange={e => addOrRemoveValue(e.target)}
      />
      <input
        type="checkbox"
        value={2}
        checked={hasValue("2")}
        data-testid="checkbox2"
        onChange={e => addOrRemoveValue(e.target)}
      />
      <input
        type="checkbox"
        value={3}
        checked={hasValue("3")}
        data-testid="checkbox3"
        onChange={e => addOrRemoveValue(e.target)}
      />
    </>
  );
};

const MockContainer: React.FC = () => {
  const formGroup = useFormGroup({
    values: {
      numbers: [],
    },
  });
  return (
    <FormGroupProvider formGroup={formGroup}>
      <MockCheckboxComponent />
      <span data-testid="value">{JSON.stringify(formGroup.values.numbers)}</span>
    </FormGroupProvider>
  );
};

describe("useFormArray", () => {
  it("can manage value array", () => {
    const { getByTestId } = render(<MockContainer />);
    const checkbox1 = getByTestId("checkbox1");
    const checkbox2 = getByTestId("checkbox2");
    fireEvent.click(checkbox1);
    let value = getByTestId("value").innerHTML;
    expect(value).toBe(JSON.stringify(["1"]));

    fireEvent.click(checkbox2);
    value = getByTestId("value").innerHTML;
    expect(value).toBe(JSON.stringify(["1", "2"]));

    fireEvent.click(checkbox2);
    value = getByTestId("value").innerHTML;
    expect(value).toBe(JSON.stringify(["1"]));
  });
});
