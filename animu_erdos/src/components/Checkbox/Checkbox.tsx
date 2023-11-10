import { ChangeEventHandler } from "react";


interface ICheckbox {
  label: string,
  value: boolean,
  disabled: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
};


function Checkbox({
  label,
  value,
  disabled,
  onChange
}: ICheckbox) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
        />
      {label}
    </label>
  );
}


export {
  Checkbox
};