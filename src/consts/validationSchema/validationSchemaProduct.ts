import * as yup from "yup";


export const ValidationSchemaForm = yup.object().shape({
    dateFrom: yup.string().required("Обязательное поле"),
    dateTill: yup.string().required("Обязательное поле"),
  });
export const validationReviewSchema = yup.object().shape({
    text: yup.string().required("Обязательное поле!"),
    star: yup.number().required("Обязательное поле!"),
  })
export  const validationComplaintsSchema = yup.object().shape({
    reason: yup.string().required("Обязательное поле!"),
    
  });

 