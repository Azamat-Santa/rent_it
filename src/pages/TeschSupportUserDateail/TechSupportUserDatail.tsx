import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputEdit from "../../component/UI/InputEdit/InputEdit";
import { techSupportApi } from "../../core/api/techSupport";
import { useSelector } from "react-redux";
import "./supportDatail.scss";
import { message, Modal } from "antd";
import Spinner from "../../component/UI/Spinner/Spinner";

const TechSupportUserDatail = () => {
  const [acceptUser, { data: acceptData, isLoading: acceptIsLoading }] =
    techSupportApi.useAcceptUserMutation();
  const [rejectUser, { data: rejectData, isLoading: rejectIsLoading }] =
    techSupportApi.useRejectUserMutation();
  const userDatail = useSelector((state: any) => state.techSupportSlice.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(userDatail);
  const [imgModal, setImgModal] = useState();
  const fullName = `${userDatail.lastName} ${userDatail.firstName}`;
  const registeredAddress = `${userDatail.registeredAddress.region} обл, ${userDatail.registeredAddress.cityOrVillage}, ул ${userDatail.registeredAddress.street} ${userDatail.registeredAddress.houseNumber}`;
  const residenceAddress = `${userDatail.residenceAddress.region} обл, ${userDatail.residenceAddress.cityOrVillage}, ул ${userDatail.residenceAddress.street} ${userDatail.residenceAddress.houseNumber}`;

  const navigate = useNavigate();

  return (
    <div className="content tech-support__datail">
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="720px"
      >
        <img src={imgModal} alt="" />
      </Modal>
      <InputEdit title="Имя" placeholder="Асан" value={fullName} />
      <InputEdit
        title="Дата рождения"
        placeholder="Дата рождения"
        value={userDatail.dateOfBirth}
      />
      <InputEdit title="Email" placeholder="Email" value={userDatail.email} />
      <InputEdit
        title="Номер телефона"
        placeholder="Номер телефона"
        value={userDatail.phoneNumber}
      />
      <InputEdit
        title="Адрес по прописке"
        placeholder="Адрес по прописке"
        value={registeredAddress}
      />
      <InputEdit
        title="Адрес по месту по проживанию"
        placeholder="Адрес по месту по проживанию"
        value={residenceAddress}
      />
      <p>Фото лицевой и задней сторон паспорта</p>

      <div className="tech-support__datail__img">
        <img
          src={userDatail.imageUser[1].image.url}
          onClick={() => {
            setIsModalOpen(true);
            setImgModal(userDatail.imageUser[1].image.url);
          }}
          alt=""
        />
        <img
          src={userDatail.imageUser[2].image.url}
          onClick={() => {
            setIsModalOpen(true);
            setImgModal(userDatail.imageUser[2].image.url);
          }}
          alt=""
        />
      </div>
      <div className="tech-support__datail__img">
        <img
          src={userDatail.imageUser[3].image.url}
          onClick={() => {
            setIsModalOpen(true);
            setImgModal(userDatail.imageUser[3].image.url);
          }}
          alt=""
        />
      </div>
      <div className="tech-support__datail__btns">
        <button
          className="button "
          onClick={() => {
            acceptUser(userDatail.id).then((data) => {
              navigate("/techSupport");
              message.success("Успешно выполнено!!!");
            });
          }}
        >
          {acceptIsLoading ? <Spinner color={"white"} /> : "Принять"}
        </button>
        <button
          className="button "
          onClick={() => {
            rejectUser(userDatail.id).then((d) => {
              navigate("/techSupport");
              message.success("Успешно выполнено!!!");
            });
          }}
        >
          {rejectIsLoading ? <Spinner color={"white"} /> : "Отклонить"}
        </button>
      </div>
    </div>
  );
};

export default TechSupportUserDatail;
