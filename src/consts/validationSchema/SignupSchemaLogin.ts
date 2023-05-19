import * as Yup from "yup";


export const SignupSchemaLogin = Yup.object().shape({
    password: Yup.string().required("Обязательное поле"),
    email: Yup.string()
      .email("Некоректный email!")
      .required("Обязательное поле"),
  });