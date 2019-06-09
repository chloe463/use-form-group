import React from "react";
import { useFormControl } from "../lib/react-form-control";

interface Props {
  checkboxes: { value: string; checked: boolean }[];
}

export const CheckboxField: React.FC<Props> = ({ checkboxes }) => {
  const { value: currentValue, setValue, errors } = useFormControl("checkbox");
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
};
