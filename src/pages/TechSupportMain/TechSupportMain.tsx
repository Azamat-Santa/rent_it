import { useEffect } from "react";
import Title from "../../component/UI/Title/Title";
import { Table } from "antd";
import Spinner from "../../component/UI/Spinner/Spinner";
import { techSupportApi } from "../../core/api/techSupport";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDatail } from "../../store/reducers/techSupport";
import "./supportMain.scss";
const TechSupportMain = () => {
  const { data, isLoading, refetch } = techSupportApi.useFetchAllUsersQuery("");
  useEffect(() => {
    refetch();
  }, []);

  const dispatch = useDispatch();
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
      title: "",
      dataIndex: "id",
      key: "id",
      render: (_: any, datail: any) => (
        <Link
          to={`/techSupportUserDatail/${datail.id}`}
          onClick={() => {
            dispatch(userDatail(datail));
          }}
        >
          Подробнее
        </Link>
      ),
    },
  ];
  return (
    <div className="tech-support">
      <div className="content">
        <Title text="Запросы" size="25px" />
        <Table
          columns={columes}
          dataSource={data}
          loading={{ indicator: <Spinner color="blue" />, spinning: isLoading }}
        />
      </div>
    </div>
  );
};

export default TechSupportMain;
