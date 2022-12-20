import React from 'react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Crumbs from './Crumbs/Crumbs';


interface IBreadCrumbLocation {
    id:string;
    path:string;
    title:string;
    url:string
}
const Breadcrumbs:FC = () => {

// const location = useLocation<IBreadCrumbLocation[]>()

    return (
        <nav className='breadcrumbs'>
         {/* {
            location.state.map((crumb)=>(
                <Crumbs {...crumb}/>
            ))
         }     */}
        </nav>
    );
};

export default Breadcrumbs;