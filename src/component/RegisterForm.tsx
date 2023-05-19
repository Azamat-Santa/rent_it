import { Checkbox, message } from "antd";
import { useFormik } from "formik";
import { SignupSchemaRegister } from "../consts/validationSchema/SignupSchemaRegister";
import { useRegisterMutation } from "../core/api/userAuth";
import Input from "./UI/Input/Input";
import { useState, FC } from "react";
import { img } from "../assets/img/indexImg";
import Spinner from "./UI/Spinner/Spinner";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface RegisterFormProps {
    handleCancel: ()=>void
}

const RegisterForm :FC<RegisterFormProps> = ({handleCancel}) => {
  const [checked, setChecked] = useState(false);
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();

  const toggleChecked = () => {
    setChecked(!checked);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const formikRegister = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchemaRegister,
    onSubmit: (patient) => {
      const { confirmPassword, ...rest } = patient;
      register(rest).then((data: any) => {
        console.log(data);
        if (data?.error) {
          message.error(data?.error?.data?.errors[0], 3);
        }
        if (data?.data) {
          message.success("Вы успешно прошли регистрацию!!!", 3);
          handleCancel();
        }
      });
    },
  });
  return (
    <form className="auth-modal__form" onSubmit={formikRegister.handleSubmit}>
      <div className="block-input">
        <Input
          id="firstName"
          name="firstName"
          typeClass="formInput"
          placeholder="Имя"
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.firstName}
          type="text"
        />
        {formikRegister.errors.firstName &&
          formikRegister.touched.firstName && (
            <div className="input__error">
              {formikRegister.errors.firstName}
            </div>
          )}
      </div>
      <div className="block-input">
        <Input
          id="email"
          name="email"
          typeClass="formInput"
          placeholder="E-mail"
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.email}
          type="text"
        />
        {formikRegister.errors.email && formikRegister.touched.email && (
          <div className="input__error">{formikRegister.errors.email}</div>
        )}
      </div>
      <div className="block-input">
        <Input
          id="password"
          name="password"
          typeClass="formInput"
          placeholder="Пароль"
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.password}
          type="password"
        />
        {formikRegister.errors.password && formikRegister.touched.password && (
          <div className="input__error">{formikRegister.errors.password}</div>
        )}
      </div>
      <div className="block-input">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          typeClass="formInput"
          placeholder="Подтверждение пароля"
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.confirmPassword}
          type="text"
        />
        {formikRegister.errors.confirmPassword &&
          formikRegister.touched.confirmPassword && (
            <div className="input__error">
              {formikRegister.errors.confirmPassword}
            </div>
          )}
      </div>

      <div className="registration-agreement">
        <Checkbox checked={checked} onChange={onChange} />
        <label onClick={toggleChecked}>
          Регистрируясь, вы принимаете Пользовательское соглашение,
          Конфиденциальность и Договор-оферта на rentit.kg
        </label>
      </div>
      <button type="submit" className="button base-button">
        {" "}
        {isLoadingRegister ? <Spinner color={"white"} /> : "Регистрация"}
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
    </form>
  );
};

export default RegisterForm;
