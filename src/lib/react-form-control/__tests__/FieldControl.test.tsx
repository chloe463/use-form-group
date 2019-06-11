import React from "react";
import { render } from "@testing-library/react";
import { FormGroupProvider } from "../FormGroupContext";
import { useFormGroup } from "../useFormGroup";
import { FieldControl } from "../FieldControl";

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
          return <input type="text" value={value} onChange={e => setValue(e.target.value)} />;
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
});
