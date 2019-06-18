import React from "react";
import { useFormArray } from "../lib/react-form-control";

interface Props {
  checkboxes: { value: string; checked: boolean }[];
}

export const CheckboxField: React.FC<Props> = ({ checkboxes }) => {
  const { addOrRemoveValue, hasValue, inputRef } = useFormArray("checkbox");
  return (
    <>
      {checkboxes.map(checkbox => {
        return (
          <label key={checkbox.value} className="Checkbox__option">
            <input
              type="checkbox"
              value={checkbox.value}
              checked={hasValue(checkbox.value)}
              onChange={e => addOrRemoveValue(e.target)}
              ref={inputRef}
            />
            <span>{checkbox.value}</span>
          </label>
        );
      })}
    </>
  );
};
