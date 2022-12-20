import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './input.scss'


interface IInputProps {
    id?:string;
    name?:string;
    type?:string;
    typeClass:string ;
    placeholder?:string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void
}

interface IInputTypes {
    searchMainInput:string;
    searchFooterInput:string;
    formInput:string;
    formReviewInput:string
    [key: string]: string;
}


export default function Input({typeClass,placeholder,value,onChange,onBlur,id,name,type}:IInputProps){
    
    const inputTypes : IInputTypes = {
        searchMainInput:'search-main-input',
        searchFooterInput:'search-footer-input',
        formInput:'form-input',
        formReviewInput:'form-review-input'
    }
    
  return (
    <input 
      id={id}
      name={name}
      type={type} 
      placeholder={placeholder}
      className={`input ${inputTypes[typeClass]}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
