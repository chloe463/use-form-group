import React from "react";
import { useFormControl } from "../lib/react-form-control";

interface Props {
  radios: { key: string; value: string }[];
}

export const RadioField: React.FC<Props> = ({ radios }) => {
  const { value, setValue } = useFormControl("radio");
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
};
