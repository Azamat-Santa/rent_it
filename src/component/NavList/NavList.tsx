import { useState } from "react";
import { navList, navListAdmin, navListTechSupport } from "./navListData";
import { Link } from "react-router-dom";
import "./navList.scss";
import { useSelector } from 'react-redux';
const NavList = ({showModal}:any) => {
  const [currentPage, setCaruntPage] = useState(0);

  const handlerCurrentPage = (idx: number) => {
    setCaruntPage(idx);
  };
  
  const isAuth = useSelector((state:any)=>state.user.isAuth)
  const user = useSelector((state: any) => state.user.user);

  return (
    <nav className={user.role === 'USER' || user.role === undefined ? "header__navlist" : "header__navlist admin" }>
      {user.role === 'USER'  ||  user.role === undefined ?  navList.map((el, idx) => (
        <Link
          to={!isAuth && el.path === '/favorite/0' ? '/' : el.path}
          className={
            currentPage === idx ? "nav-list-item active" : "nav-list-item"
          }
          key={el.path}
          onClick={() => {
            handlerCurrentPage(idx)
            el.text === 'Профиль' && !isAuth &&  showModal()
          }}
        >
          {el.text}
        </Link>
      )): user.role === 'TECH_SUPPORT' ?   navListTechSupport.map((el, idx) => (
        <Link
          to={!isAuth && el.path === '/favorite/0' ? '/' : el.path}
          className={
            currentPage === idx ? "nav-list-item active" : "nav-list-item"
          }
          key={el.path}
          onClick={() => {
            handlerCurrentPage(idx)
            el.text === 'Профиль' && !isAuth &&  showModal()
          }}
        >
          {el.text}
        </Link>
      )):
      navListAdmin.map((el, idx) => (
        <Link
          to={!isAuth && el.path === '/favorite/0' ? '/' : el.path}
          className={
            currentPage === idx ? "nav-list-item active" : "nav-list-item"
          }
          key={el.path}
          onClick={() => {
            handlerCurrentPage(idx)
            el.text === 'Профиль' && !isAuth &&  showModal()
          }}
        >
          {el.text}
        </Link>
      )
    )}
    </nav>
  )}
      


export default NavList;
