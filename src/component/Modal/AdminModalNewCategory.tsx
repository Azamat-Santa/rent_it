import { message, Modal } from "antd";
import Input from "../UI/Input/Input";
import Title from "../UI/Title/Title";
import { useState, FC } from "react";
import { img } from "./../../assets/img/indexImg";
import { category, ICategoryPost } from "../../core/api/categories";
import Spinner from "../UI/Spinner/Spinner";

interface AdminModalNewCategoryProps {
  isModalCategoryOpen: boolean;
  setIsModalCategoryOpen: (active: boolean) => void;
}

const AdminModalNewCategory: FC<AdminModalNewCategoryProps> = ({
  isModalCategoryOpen,
  setIsModalCategoryOpen,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [inputList, setInputList] = useState<any>([{ value: "" }]);
  const [
    addNewCategory,
    { isLoading: newCategoryLoading },
  ] = category.useAddNewCategoryMutation();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addInput = () => {
    setInputList([...inputList, { value: "" }]);
  };
const createNewCategory = () => {
    const fields: string[] = [];
    inputList.forEach((element: any) => {
      if (element.value) {
        fields.push(element.value);
      }
    });
    const parametr = {
      categoryName: categoryName,
      addFields: fields,
    };

    addNewCategory(parametr).then((res) => {
      message.success("Успешно создана новая категория!!");
      setIsModalCategoryOpen(false);
      setInputList([{ value: "" }]);
    });
  }
  return (
    <Modal
      open={isModalCategoryOpen}
      onCancel={() => setIsModalCategoryOpen(false)}
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
        onChange={(e) => setCategoryName(e.target.value)}
      />
      {inputList.map((input: any, idx: number) => (
        <input
          key={idx}
          className="input form-input"
          name="value"
          placeholder="Характеристика"
          value={input.value}
          onChange={(e) => handleInputChange(e, idx)}
        />
      ))}
      <img
        src={img.newCategory}
        alt=""
        style={{ width: "70%", cursor: "pointer" }}
        onClick={addInput}
      />
      <div
        style={{ marginTop: "40px", display: "flex", justifyContent: "end" }}
        onClick={createNewCategory}
      >
        <button className="button ">
          {newCategoryLoading ? <Spinner color={"blue"} /> : "Добавить"}
        </button>
      </div>
    </Modal>
  );
};

export default AdminModalNewCategory;
