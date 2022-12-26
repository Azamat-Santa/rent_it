import * as yup from "yup";


export const ValidationSchemaStepOne = yup.object().shape({
    firstName: yup.string().required('Обязательное поле!'),
    lastName: yup.string().required('Обязательное поле!'),
    phoneNumber: yup.string().required('Обязательное поле!'),
    dateOfBirth: yup.string().required('Обязательное поле!'),
    middleName:yup.string().required('Обязательное поле!'),
  });
  export const ValidationSchemaStepTwo = yup.object().shape({
    region: yup.string().required('Обязательное поле!'),
    cityOrVillage: yup.string().required('Обязательное поле!'),
    district: yup.string().required('Обязательное поле!'),
    street: yup.string().required('Обязательное поле!'),
    houseNumber: yup.number().required('Обязательное поле!'),
    apartmentNumber: yup.number().required('Обязательное поле!'),
  });
  export  const ValidationSchemaStepTwoResidenceAddress = yup.object().shape({
    region: yup.string().required('Обязательное поле!'),
    cityOrVillage: yup.string().required('Обязательное поле!'),
    district: yup.string().required('Обязательное поле!'),
    street: yup.string().required('Обязательное поле!'),
    houseNumber: yup.number().required('Обязательное поле!'),
    apartmentNumber: yup.number().required('Обязательное поле!'),
  });
  export const ValidationSchemaStepThree = yup.object().shape({
    tin: yup.string().required('Обязательное поле!'),
    dateOfIssue: yup.string().required('Обязательное поле!'),
    authority: yup.string().required('Обязательное поле!'),
    sidePassportPicture1: yup.mixed().required('Обязательное поле!'),
    sidePassportPicture2: yup.mixed().required('Обязательное поле!'),
    passportWithMe: yup.mixed().required('Обязательное поле!'),
    termsOfUse:yup.bool().oneOf([true], 'В поле должно стоять галочка!')
  });


//   {
//     formikStepOne.values.value.map((key,index)=>{
//       console.log(key[index])
//       return(
//         <div className="block-input">
//       <Input
//         id={key.key}
//         placeholder={key[1]}
//         typeClass="formInput"
//         name={key}
//         onChange={formikStepOne.handleChange}
//         onBlur={formikStepOne.handleBlur}
//         value={formikStepOne.values.key}
//         type="text"
//       />
//       {formikStepOne.errors.key &&
//         formikStepOne.touched.key && (
//           <div className="input__error">
//             {formikStepOne.errors.key}
//           </div>
//       )}
//     </div>
//       )
      

//     })
    
//   }