import NavList from "../NavList/NavList";
import "./header.scss";
import accountImg from '../../assets/img/accImg.png'
import { useDispatch } from 'react-redux';
import { logOut } from "../../store/reducers/user";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Header = ({showModal}:any) => {
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const isAuth = useSelector((state:any)=>state.user.isAuth)
   const logout = ()=>{
    dispatch(logOut())
    message.success('Вы успешно вышли!!',1)
    navigate('/')
   }
  return (
    <header className="header">
      <div className="content header__content">
        <div className="header__logo">Rentit</div>
        <NavList showModal={showModal}/>
        <div className="header__account">
            <img src={accountImg} alt="" />
            {isAuth && <div onClick={logout}>Выйти</div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
