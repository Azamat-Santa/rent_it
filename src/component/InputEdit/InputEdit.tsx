import React from "react";
import { FC } from "react";
import "./inputEdit.scss";
import passwordShow from "../../assets/img/passwordShow.png";


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
      // !createInput &&  !password? (
      //   <div className="input-edit__icon">
      //     <img src={editIcon} alt="" />
      //   </div>
      // ) : 
      password ? (
        <div className="input-edit__icon">
          <img src={passwordShow} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default InputEdit;
