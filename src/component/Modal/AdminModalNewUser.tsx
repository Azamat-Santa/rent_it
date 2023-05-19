import { Modal } from "antd";
import { FC } from "react";
import Input from "../UI/Input/Input";
import Title from "../UI/Title/Title";
import Button from "../UI/Button/Button";

interface AdminModalNewUserProps {
  isModal: boolean;
  handleOk:()=>void;
  handleCancel:()=>void
}


const AdminModalNewUser :FC<AdminModalNewUserProps> = ({
  isModal,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      open={isModal}
      onOk={handleOk}
      onCancel={handleCancel}
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
