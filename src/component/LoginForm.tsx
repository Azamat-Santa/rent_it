import { message } from "antd";
import { useFormik } from "formik";
import { img } from "../assets/img/indexImg";
import { SignupSchemaLogin } from "../consts/validationSchema/SignupSchemaLogin";
import { useLoginMutation } from "../core/api/userAuth";
import Input from "./UI/Input/Input";
import Spinner from "./UI/Spinner/Spinner";
import { FC } from "react";

interface LoginFormProps {
  handleCancel: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleCancel }) => {
  const [login, { isLoading: isLoadingLogin, isError, isSuccess}] =
    useLoginMutation();

  const userLogin = async (patient: any) => {
    login(patient)
      .unwrap()
      .then((data: any) => {
        console.log(data,'res');
        
        if (isError) {
          message.error(data?.error?.data?.errors[0], 3);
        }
        if (isSuccess) {
          message.success("Вы успешно прошли авторизацию!!!", 3);
          handleCancel();
        }
      })
      .catch((res) => {
        message.error(res?.error?.data?.errors[0], 3);
      });
  };
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchemaLogin,
    onSubmit: (patient) => {
      userLogin(patient);
    },
  });
  return (
    <form className="auth-modal__form" onSubmit={formikLogin.handleSubmit}>
      <div className="block-input">
        <Input
          id="email"
          name="email"
          typeClass="formInput"
          placeholder="E-mail"
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          value={formikLogin.values.email}
          type="text"
        />
        {formikLogin.errors.email && formikLogin.touched.email && (
          <div className="input__error">{formikLogin.errors.email}</div>
        )}
      </div>
      <div className="block-input">
        <Input
          id="password"
          name="password"
          typeClass="formInput"
          placeholder="Пароль"
          value={formikLogin.values.password}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          type="password"
        />
        {formikLogin.errors.password && formikLogin.touched.password && (
          <div className="input__error">{formikLogin.errors.password}</div>
        )}
      </div>

      <button className="button base-button" type="submit">
        {isLoadingLogin ? <Spinner /> : "Войти"}
      </button>
      <div style={{ textAlign: "center" }}>или войти с помощью</div>
      <div className="modal-login__icons">
        <img src={img.googleIcon} alt="" />
        <img
          src={img.fbIcon}
          alt=""
          style={{ width: "55px", height: "55px", borderRadius: "50px" }}
        />
      </div>

      <div className="forgot-password">Забыли пароль?</div>
    </form>
  );
};

export default LoginForm;
