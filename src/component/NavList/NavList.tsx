import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navList.scss";
import { useSelector } from 'react-redux';
import { handlerNavlist } from "../../core/helpers/handleNavlist"

const NavList = ({showModal}:any) => {
  const isAuth = useSelector((state:any)=>state.user.isAuth)
  const user = useSelector((state: any) => state.user.user);

  const handlerCurrentPage = (text:string,idx: number) => {
    text === 'Профиль' && !isAuth &&  showModal()
  };

 const currentNavlist = handlerNavlist(user.role)
  
  return (
    <nav className={user.role === 'USER' || user.role === undefined ? "header__navlist" : "header__navlist admin" }>
      {currentNavlist.map((el, idx) => (
        <NavLink
          to={!isAuth && el.path === '/favorite/0' ? '/' : el.path}
          className={({isActive})=> `nav-list-item ${isActive && 'active'}`}
          key={el.path}
          onClick={() => handlerCurrentPage(el.text,idx)}
          >
          {el.text}
        </NavLink>
      ))}
    </nav>
  )}
      


export default NavList;
