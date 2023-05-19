import { useState } from "react";
import { Modal } from "antd";
import "./authModal.scss";
import  classNames  from 'classnames';
import LoginForm from "../../LoginForm";
import RegisterForm from "../../RegisterForm";
interface IAuthModal {
  handleCancel: () => void;
  isModalOpen: boolean;
}
const AuthModal = ({ handleCancel, isModalOpen }: IAuthModal) => {
  const [isLogin, setIsLogin] = useState({
    auth: true,
    register: false,
  });
  
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
 

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="modal-login__handler">
          <div
            className={classNames('modal-login__handler__btn',{'active':isLogin.auth})}
            onClick={() => handleForm("login")}
          >
            Войти
          </div>
          <div
            className={ classNames('modal-login__handler__btn',{'active':isLogin.register})}
            onClick={() => handleForm("registr")}
          >
            Регистрация
          </div>
        </div>

        <div className="modal-login__content">
          <div
            className={ classNames('modal-login__content__login',{'active':isLogin.auth})}
          >
            <LoginForm handleCancel={handleCancel}/>
          </div>
          <div
            className={ classNames('modal-login__content__register',{'active':isLogin.register})}
          >
            <RegisterForm handleCancel={handleCancel}/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
