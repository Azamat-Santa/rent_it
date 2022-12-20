import React from 'react';
import './editTextArea.scss'
import { FC } from 'react';
import { img } from './../../assets/img/indexImg';
interface ITextAreaProps {
    id?:string;
    title?:string;
    name?:string;
    type?:string;
    typeClass?:string ;
    placeholder?:string;
    value?:string;
    createInput?:boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onBlur?:(e:React.FocusEvent<HTMLTextAreaElement>)=>void
}
const EditTextArea:FC<ITextAreaProps> = ({title,placeholder,createInput,name,value,onBlur,onChange,id}) => {
    
    return (
        <div className='textArea-edit'>
        <h3>{title}</h3>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />  
        {
          createInput ? 
          null
          :
          <div 
           className='textArea-edit__icon'
          >
            <img src={img.editIcon} alt="" />
          </div>
        }
        
      </div>
    );
};

export default EditTextArea;