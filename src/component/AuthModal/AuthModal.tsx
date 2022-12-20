import { ChangeEvent, useState ,useEffect} from "react";
import { message, Modal, Spin,Checkbox } from "antd";
import "./authModal.scss";
import Input from "../Input/Input";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../../api/userAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from './../Spinner/Spinner';
import { GoogleLogin } from '@leecheuk/react-google-login';

import {gapi} from 'gapi-script'
import { img } from "../../assets/img/indexImg";
interface IAuthModal {
  handleCancel: () => void;
  isModalOpen: boolean;
}
const AuthModal = ({ handleCancel, isModalOpen }: IAuthModal) => {
  const [isLogin, setIsLogin] = useState({
    auth: true,
    register: false,
  });
  const user =(state:any) => state.user.user
  const [login, { isLoading: isLoadingLogin, data: isLoginData, isError,error }] = useLoginMutation();
  const [register, { isLoading: isLoadingRegister, data }] =
    useRegisterMutation();
  
 
  const userLogin = async (patient:any) =>{
    login(patient).then((data:any)=>{
      if(data?.error){
        message.error(data?.error?.data?.errors[0],3)
      }
      if(data?.data){
        message.success('Вы успешно прошли авторизацию!!!',3)
        handleCancel()
      }
    })
  }

  useEffect(() => {
   function start() {
    gapi.client.init({
      clientId:process.env.REACT_APP_CLIENT_ID_GOOGLE,
      scope:''
    })
   }
   gapi.load('client:auth2',start)
  }, [])
  

 
  
 
  
  const SignupSchemaLogin = Yup.object().shape({
    password: Yup.string().required("Обязательное поле"),
    email: Yup.string()
      .email("Некоректный email!")
      .required("Обязательное поле"),
  });
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchemaLogin,
    onSubmit: (patient) => {
      console.log(patient);
      userLogin(patient)
    },
  });
  const SignupSchemaRegister = Yup.object().shape({
    firstName: Yup.string().required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
    confirmPassword: Yup.string()
      .required("Обязательное поле")
      .oneOf([Yup.ref("password"), null], "Пароль не совпадает"),
    email: Yup.string()
      .email("Некоректный email!")
      .required("Обязательное поле"),
  });
  const formikRegister = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchemaRegister,
    onSubmit: (patient) => {
      const {confirmPassword , ...rest} = patient
      console.log(rest);
      register(rest).then((data:any)=>{
        console.log(data);
        if(data?.error){
          message.error(data?.error?.data?.errors[0],3)
        }
        if(data?.data){
          message.success('Вы успешно прошли регистрацию!!!',3)
          handleCancel()
        }
      })
    },
  });
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const toggleChecked = () => {
    setChecked(!checked);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const handleForm = (value: string) => {
    value === "login" &&
      setIsLogin({
        auth: true,
        register: false,
      });
    value === "registr" &&
      setIsLogin({
        auth: false,
        register: true,
      });
  };
  const onSuccess = (res:any)=>{
       console.log(res);

  }
  const onFailure = (res:any)=>{
    console.log(res);

}

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="modal-login__handler">
          <div
            className={
              isLogin.auth
                ? "modal-login__handler__btn active"
                : "modal-login__handler__btn"
            }
            onClick={() => handleForm("login")}
          >
            
            Войти
          </div>
          <div
            className={
              isLogin.register
                ? "modal-login__handler__btn active"
                : "modal-login__handler__btn"
            }
            onClick={() => handleForm("registr")}
          >
            Регистрация
          </div>
        </div>

        <div className="modal-login__content">
          <div
            className={
              isLogin.auth
                ? "modal-login__content__login active"
                : "modal-login__content__login"
            }
          >
            <form
              className="auth-modal__form"
              onSubmit={formikLogin.handleSubmit}
            >
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
                {formikLogin.errors.password &&
                  formikLogin.touched.password && (
                    <div className="input__error">
                      {formikLogin.errors.password}
                    </div>
                  )}
              </div>

              <button className="button base-button" type="submit">
                {isLoadingLogin ? <Spin /> : "Войти"}
              </button>
              <div style={{textAlign:'center'}}>или войти с помощью</div>
              <div className="modal-login__icons">
               <img src={img.googleIcon} alt="" />
               <img src={img.fbIcon} alt="" style={{width:'55px',height:'55px',borderRadius:'50px'}}/>
               
             </div>

              <div className="forgot-password">Забыли пароль?</div>
            </form>
          </div>
          <div
            className={
              isLogin.register
                ? "modal-login__content__register active"
                : "modal-login__content__register"
            }
          >
            <form 
              className="auth-modal__form"
              onSubmit={formikRegister.handleSubmit}
            >
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
                {formikRegister.errors.email &&
                  formikRegister.touched.email && (
                    <div className="input__error">
                      {formikRegister.errors.email}
                    </div>
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
                {formikRegister.errors.password &&
                  formikRegister.touched.password && (
                    <div className="input__error">
                      {formikRegister.errors.password}
                    </div>
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
              <button type="submit" className="button base-button"> {isLoadingRegister ? <Spinner color={'white'}/> : 'Регистрация'}</button>
              <div style={{textAlign:'center'}}>или войти с помощью</div>
              <div className="modal-login__icons">
              <GoogleLogin
                clientId={`${process.env.REACT_APP_CLIENT_ID_GOOGLE}`}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
               <img src={img.googleIcon} alt="" />
               <img src={img.fbIcon} alt="" style={{width:'55px',height:'55px',borderRadius:'50px'}}/>
             </div>
            </form>
          </div>
        </div>

      </Modal>
    </>
  );
};

export default AuthModal;
