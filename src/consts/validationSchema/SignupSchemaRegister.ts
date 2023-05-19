import * as Yup from "yup";


export const SignupSchemaRegister = Yup.object().shape({
    firstName: Yup.string().required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
    confirmPassword: Yup.string()
      .required("Обязательное поле")
      .oneOf([Yup.ref("password"), null], "Пароль не совпадает"),
    email: Yup.string()
      .email("Некоректный email!")
      .required("Обязательное поле"),
  });