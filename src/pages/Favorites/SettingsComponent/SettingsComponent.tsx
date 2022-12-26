import Title from "../../../component/UI/Title/Title";
import { useState } from "react";
import './settingsComponent.scss'
import InputEdit from "../../../component/UI/InputEdit/InputEdit";
import Button from "../../../component/UI/Button/Button";
import axios from "axios";


const SettingsComponent = () => {
  const [isShowCurrency, setIsShowCurrency] = useState(false);
  const currencySelect = [
    {
      currency: "KGS",
    },
    {
      currency: "USD",
    },
  ];
  const [res,setRes] = useState({})
//   React.useEffect(() => {
//     const fetch = async ()=>{
//        const resp = await axios.get('https://rentit2022.herokuapp.com/oauth2/authorize/google')
//        console.log(res);
       
//        setRes(resp)
//     }
//     fetch()
//   }, [])
  
  return (
    <div className="settings">
      <Title text="Личные настройки" margin="15px" size="28px" />
      <Title
        text="Валюта"
        margin="15px"
        size="18px"
        color="rgba(91, 90, 90, 1)"
      />
      {isShowCurrency && (
        <div className="settings__currency__select">
          {currencySelect.map((currency) => (
            <div>{currency.currency}</div>
          ))}
        </div>
      )}
      <Title text="Личная информация" margin="15px" size="28px" />
      <InputEdit title="Имя" placeholder="Асан"/>
      <InputEdit title="Email" placeholder="asan@gmail.com"/>
      <Title text="Изменение пароля" margin="15px" size="28px" />
      <InputEdit title="Текущий пароль" placeholder="********" password/>
      <InputEdit title="Новый пароль" placeholder="********" password/>
      <InputEdit title="Подтверждение пароля" placeholder="********" password/>
      <Button text="Деактивировать" typeClass="productButton"/>
    </div>
  );
};

export default SettingsComponent;
