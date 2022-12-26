import React from "react";
import { img } from "../../../assets/img/indexImg";
import "./inputEdit.scss";


interface IInputProps {
  id?: string;
  title?: string;
  name?: string;
  type?: string;
  typeClass?: string;
  placeholder?: string;
  value?: string;
  createInput?: boolean;
  password?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputEdit = ({
  id,
  title,
  placeholder,
  createInput,
  password,
  name,
  type,
  value,
  onBlur,
  onChange
}:IInputProps) => {
  return (
    <div className="input-edit">
      <h3>{title}</h3>
      <input 
        id={id}
        type={type}
        placeholder={placeholder} 
        name ={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {
      password ? (
        <div className="input-edit__icon">
          <img src={img.passwordShow} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default InputEdit;
