import { Modal } from 'antd';
import React from 'react';
import Spinner from '../../../component/Spinner/Spinner';
import Title from './../../../component/Title/Title';
import { navListAdminMain } from './const';
import Button from './../../../component/Button/Button';

const AdminModalConfirm = ({isModalOpen,handleOk,handleCancel,activeTab,removeHandler,deleteAdLoading}:any) => {
    
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Title text={navListAdminMain[activeTab].title ==='Товары' ? "Вы хотите удалить этот товар?" : "Вы хотите удалить этого пользователя?"} typeClass="smallTitle" textAlign='center' margin='50px'/>
        <div className='admin__modal__remove'>
            <button className='button' onClick={removeHandler}>{ deleteAdLoading ? <Spinner color={'white'}/>:'Удалить'} </button>
            <div onClick={handleCancel}>
              <Button text='Отмена' background='transparent' outline={true}/>
            </div>
        </div>
    </Modal>
    );
};

export default AdminModalConfirm;