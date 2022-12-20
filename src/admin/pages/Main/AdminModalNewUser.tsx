import { Modal } from 'antd';
import React from 'react';
import Input from '../../../component/Input/Input';
import Title from './../../../component/Title/Title';
import Button from './../../../component/Button/Button';

const AdminModalNewUser = ({isModalNewUserOpen,handleOkNewUser,handleCancelNewUser}:any) => {
    return (
      <Modal
        open={isModalNewUserOpen}
        onOk={handleOkNewUser}
        onCancel={handleCancelNewUser}
        footer={false}
      >
        <Title
          text="Добавить пользователя"
          typeClass="smallTitle"
          textAlign="center"
          margin="50px"
          size="20px"
        />
        <Input typeClass="formInput" placeholder="Имя" />
        <Input typeClass="formInput" placeholder="Email" />
        <Input typeClass="formInput" placeholder="Пароль" />
        <div
          style={{ marginTop: "40px", display: "flex", justifyContent: "end" }}
        >
          <Button text="Добавить" />
        </div>
      </Modal>
    );
};

export default AdminModalNewUser;