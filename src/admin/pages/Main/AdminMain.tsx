import { message, Modal, Table } from "antd";
import React from "react";
import { userApi } from "../../../api/userApi";
import Button from "../../../component/Button/Button";
import Title from "../../../component/Title/Title";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/Delete.png";
import newCategory from '../../../assets/img/newCategory.png'
import "./adminMain.scss";
import { useState } from "react";
import Input from "../../../component/Input/Input";
import Spinner from "../../../component/Spinner/Spinner";
import { adApi } from "../../../api/ad";
import Statistick from "../../component/Statistick/Statistick";
import { navListAdminMain } from "./const";
import AdminModalConfirm from "./AdminModalConfirm";
import AdminModalNewUser from "./AdminModalNewUser";
import Category from "../../component/Category/Category";
import {useNavigate } from 'react-router-dom';
import { category } from "../../../api/categories";

const AdminMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isModalNewUserOpen, setIsModaNewUserlOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [removwUserId, setRemovwUserId] = useState(0);
  const [removwAdId, setRemovwAdId] = useState(0);
  const [categoryName,setCategoryName] = useState('')
  const [inputList, setInputList] = useState<any>([{ value: "" }]);
  const openTab = (e: any) => setActiveTab(+e.target.dataset.index);
  const navigate = useNavigate()
  const remove = async () => {
    const tocken = localStorage.getItem("accessTocken");
    const res = await fetch(
      `http://139.59.77.163:8080/api/v1/users/${removwUserId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tocken}`,
        },
      }
    );
    setIsModalOpen(false);
    refetch();
  };

  const [deleteAd, { data: deleteAdData, isLoading: deleteAdLoading }] =
    adApi.useDeleteAdMutation();
  const { data, isLoading } = userApi.useFetchAllUsersQuery();
  const {
    data: dataAd,
    isLoading: isLoadingAd,
    refetch,
  } = adApi.useFetchAllAdsQuery();
  const [addNewCategory,{data:newCategoryData,isLoading:newCategoryLoading}] = category.useAddNewCategoryMutation()

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
      remove();
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
      render: ({ cityOrVillage, region, apartmentNumber, street }: any) =>
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
      render: ({ cityOrVillage, region, apartmentNumber, street }: any) =>
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
      render: ({ authority, dateOfIssue, tin }: any) =>
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
      render: (_: any, { id }: any) => {
        return (
          <div className="table__columes__options">
            <img src={editIcon} alt="" />
            <img
              src={deleteIcon}
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
            <img src={editIcon} alt="" />
            <img
              src={deleteIcon}
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
      content:<Category />
    }
  ];
  const handleInputChange = (e:any, index:number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addInput = () => {
    setInputList([...inputList, {  value: "" }]);
  };
  

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
        handleCancelNewUser={handleCancelNewUser}
        handleOkNewUser={handleOkNewUser}
        isModalNewUserOpen={isModalNewUserOpen}
      />
      <Modal
        open={isModalCategoryOpen}
        onCancel={()=>setIsModalCategoryOpen(false)}
        footer={false}
      >
       <Title
          text="Добавить категорию"
          typeClass="smallTitle"
          textAlign="center"
          margin="50px"
          size="20px"
        />
        <Input 
        typeClass="formInput" 
        placeholder="Название" 
        value={categoryName}
        onChange={(e)=>setCategoryName(e.target.value)}
        />
        {
          inputList.map((input:any,idx:number)=>(
            <input
             className="input form-input"
             name="value"
             placeholder="Характеристика" 
             value={input.value}
             onChange={e => handleInputChange(e, idx)}
           />
          ))
        }
        <img 
        src={newCategory} 
        alt="" 
        style={{width:'70%',cursor:'pointer'}}
        onClick={addInput}
        />
        <div
          style={{ marginTop: "40px", display: "flex", justifyContent: "end" }}
          onClick={()=>{
            console.log(inputList);
            const fields : any = []
            inputList.forEach((element:any) => {
              if(element.value){
                fields.push(element.value)
              }
            });
            const parametr = {
              categoryName:categoryName,
              addFields:fields
            }
            
            addNewCategory(parametr).then(res=>{
              console.log(res,'res');
              message.success('Успешно создана новая категория!!')
              setIsModalCategoryOpen(false)
              setInputList([{value:''}])
            })
          }}
        >
          <button className="button ">{ newCategoryLoading ? <Spinner color={'blue'}/> : 'Добавить'}</button>
        </div>
      </Modal>
      <div className="admin__category__list">
        {navListAdminMain.map((el: any, idx: number) => (
          <div
            onClick={openTab}
            data-index={idx}
            className={
              activeTab === idx
                ? "admin__category__list__item active"
                : "admin__category__list__item"
            }
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
          <div onClick={()=>{
            if(navListAdminMain[activeTab].title === "Категории"){
              setIsModalCategoryOpen(true)
            }else if(navListAdminMain[activeTab].title === "Товары"){
              navigate('/newProduct')
            }else{
              showModalNewUser()
            }
            }}>
            <Button text="Добавить" />
          </div>
        )}
      </div>
      {tabContent[activeTab] && <div>{tabContent[activeTab].content}</div>}
    </div>
  );
};

export default AdminMain;
