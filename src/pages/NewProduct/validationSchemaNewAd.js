import * as yup from "yup";


export const validationSchemaNewAd = yup.object().shape({
    title: yup.string().required('Обязательное поле!'),
    description: yup.string().required('Обязательное поле!'),
    price: yup.number().required('Обязательное поле!'),
    bookDateFrom: yup.string().required('Обязательное поле!'),
    bookDateTill: yup.string().required('Обязательное поле!'),
    addres: yup.string().required('Обязательное поле!'),
    locationX: yup.number().required('Обязательное поле!'),
    locationY: yup.number().required('Обязательное поле!'),
    image: yup.string().required('Обязательное поле!'),
  });