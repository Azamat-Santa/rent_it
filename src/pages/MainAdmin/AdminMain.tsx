import { message, Modal, Table } from "antd";
import React from "react";
import { userApi } from "../../core/api/userApi";
import Button from "../../component/UI/Button/Button";
import Title from "../../component/UI/Title/Title";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/Delete.png";
import newCategory from "../../../assets/img/newCategory.png";
import "./adminMain.scss";
import { useState } from "react";
import Spinner from "../../component/UI/Spinner/Spinner";
import { adApi } from "../../core/api/ad";
import Statistick from "../../component/Statistick/Statistick";
import AdminModalConfirm from "../../component/Modal/AdminModalConfirm";
import AdminModalNewUser from "../../component/Modal/AdminModalNewUser";
import Category from "../../component/Category/Category";
import { useNavigate } from "react-router-dom";
import { routeEndpoints } from "../../consts/routeEndpoints";
import { navListAdminMain } from "../../consts/navListAdminMain";
import { IRegisteredAddress } from "../../core/types/IRegisteredAddress";
import { IResidenceAddress } from "../../core/types/IResidenceAddress";
import { IPassport } from "../../core/types/IPassport";
import { IUserInComplete } from "../../core/types/IUserInComplete";
import { img } from "../../assets/img/indexImg";
import classNames from "classnames";
import AdminModalNewCategory from "../../component/Modal/AdminModalNewCategory";

const AdminMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] =
    useState<boolean>(false);
  const [isModalNewUserOpen, setIsModaNewUserlOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [removwUserId, setRemovwUserId] = useState(0);
  const [removwAdId, setRemovwAdId] = useState<number>(0);

  const openTab = (e: any) => setActiveTab(+e.target.dataset.index);
  const navigate = useNavigate();

  const [deleteAd, { data: deleteAdData, isLoading: deleteAdLoading }] =
    adApi.useDeleteAdMutation();
  const [removeUser] = userApi.useRemoveUserMutation();
  const { data, isLoading } = userApi.useFetchAllUsersQuery("");
  const {
    data: dataAd,
    isLoading: isLoadingAd,
    refetch,
  } = adApi.useFetchAllAdsQuery(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalNewUser = () => {
    setIsModaNewUserlOpen(true);
  };

  const handleOkNewUser = () => {
    setIsModaNewUserlOpen(false);
  };

  const handleCancelNewUser = () => {
    setIsModaNewUserlOpen(false);
  };
  const removeHandler = () => {
    if (navListAdminMain[activeTab].title === "Товары") {
      deleteAd(removwAdId).then((data) => {
        setIsModalOpen(false);
        message.success("Успешно удалено!");
        refetch();
      });
    } else {
      removeUser(removwUserId);
    }
  };

  const openModalHandler = () => {
    if (navListAdminMain[activeTab].title === "Категории") {
      setIsModalCategoryOpen(true);
    } else if (navListAdminMain[activeTab].title === "Товары") {
      navigate(routeEndpoints.newProduct);
    } else {
      showModalNewUser();
    }
  };
  const columes = [
    {
      title: "ФИО",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "Дата рождения",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "telefon",
    },
    {
      title: "Адрес по прописке",
      dataIndex: ["registeredAddress"],
      key: "addresProp",
      render: ({
        cityOrVillage,
        region,
        apartmentNumber,
        street,
      }: IRegisteredAddress) =>
        cityOrVillage !== " " ? (
          <div>
            {region} ,{cityOrVillage}, ул. {street} {apartmentNumber}
          </div>
        ) : (
          <div>-</div>
        ),
    },
    {
      title: "Адрес по месту проживания",
      dataIndex: ["residenceAddress"],
      key: "adressPro",
      render: ({
        cityOrVillage,
        region,
        apartmentNumber,
        street,
      }: IResidenceAddress) =>
        cityOrVillage !== " " ? (
          <div>
            {region} ,{cityOrVillage}, ул. {street} {apartmentNumber}
          </div>
        ) : (
          <div>-</div>
        ),
    },
    {
      title: "Паспортные данные",
      dataIndex: ["passportData"],
      key: "passport",
      render: ({ authority, dateOfIssue, tin }: IPassport) =>
        authority !== " " ? (
          <div>
            {authority} {dateOfIssue} {tin}{" "}
          </div>
        ) : (
          <div>-</div>
        ),
    },
    {
      title: "Опции",
      dataIndex: "id",
      key: "key",
      render: (_: any, { id }: IUserInComplete) => {
        return (
          <div className="table__columes__options">
            <img src={img.editIcon} alt="" />
            <img
              src={img.deleteImg}
              alt=""
              onClick={() => {
                setRemovwUserId(id);
                showModal();
              }}
            />
          </div>
        );
      },
    },
  ];
  const columesAd = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Просмотры",
      dataIndex: "clickNumber",
      key: "clickNumber",
    },
    {
      title: "Опции",
      dataIndex: "delete",
      key: "key",
      render: (_: any, book: any) => {
        return (
          <div className="table__columes__options">
            <img src={img.editIcon} alt="" />
            <img
              src={img.deleteImg}
              alt=""
              onClick={() => {
                showModal();
                setRemovwAdId(book.productId);
              }}
            />
          </div>
        );
      },
    },
  ];

  const tabContent = [
    {
      content: <Statistick />,
    },
    {
      content: (
        <Table
          columns={columes}
          dataSource={data}
          loading={{ indicator: <Spinner color="blue" />, spinning: isLoading }}
        />
      ),
    },
    {
      content: (
        <Table
          columns={columesAd}
          dataSource={dataAd}
          loading={{
            indicator: <Spinner color="blue" />,
            spinning: isLoadingAd,
          }}
        />
      ),
    },
    {
      content: <Category />,
    },
  ];

  return (
    <div className="admin content">
      <AdminModalConfirm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        activeTab={activeTab}
        removeHandler={removeHandler}
        deleteAdLoading={deleteAdLoading}
      />
      <AdminModalNewUser
        handleCancel={handleCancelNewUser}
        handleOk={handleOkNewUser}
        isModal={isModalNewUserOpen}
      />
      <AdminModalNewCategory
        isModalCategoryOpen={isModalCategoryOpen}
        setIsModalCategoryOpen={setIsModalCategoryOpen}
      />

      <div className="admin__category__list">
        {navListAdminMain.map((el: any, idx: number) => (
          <div
            onClick={openTab}
            data-index={idx}
            className={classNames("admin__category__list__item", {
              active: activeTab === idx,
            })}
            key={el.title}
          >
            {el.title}
          </div>
        ))}
      </div>
      <div className="admin__title">
        <Title text={`${navListAdminMain[activeTab].title}`} />
        {navListAdminMain[activeTab].title === "Статистика" ? (
          <div></div>
        ) : (
          <div onClick={openModalHandler}>
            <Button text="Добавить" />
          </div>
        )}
      </div>
      {tabContent[activeTab] && <div>{tabContent[activeTab].content}</div>}
    </div>
  );
};

export default AdminMain;
