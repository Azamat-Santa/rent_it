import { useState, useEffect } from "react";
import Header from "./component/Header/Header";
import "./App.scss";
import Footer from "./component/Footer/Footer";
import { useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import { useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import AuthModal from "./component/Modal/AuthModal/AuthModal";
import {
  changeBackgroundOnBlue,
  changeBackgroundOnWhite,
} from "./store/reducers/ui";
import { authUser } from "./core/api/userAuth";
import RoutesMain from "./component/Routes/Routes";
import { routeEndpoints } from "./consts/routeEndpoints";

const App = () => {
  const [searchAd, setSearchAd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refreshTocken, { data }] = authUser.useRefreshTockenMutation();

  useEffect(() => {
    const token = localStorage.getItem("accessTocken");
    const refreshToken = localStorage.getItem("refreshTocken");
    if (token) {
      refreshTocken({ refreshToken: refreshToken });
    }
  }, []);
  useEffect(() => {
    setSearchAd("");
    if (
      location.pathname === routeEndpoints.fullRegistration ||
      location.pathname === routeEndpoints.techSupport
    ) {
      dispatch(changeBackgroundOnBlue("rgba(237, 247, 251, 1)"));
    } else {
      dispatch(changeBackgroundOnWhite("white"));
    }
  }, [location.pathname]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const backgound = useSelector((state: any) => state.uiSlice.backgound);
 useEffect(() => {
   fetch(`${process.env.REACT_APP_BASE_URL}/get/category-fields`)
   .then(res=>{
    console.log('res1',res);
    return res.json()
   }).then(res=>{
    console.log('res',res);
    
   })
 }, [])
 

  return (
    <div style={{ background: backgound }}>
      <Header showModal={showModal} />
      <AuthModal handleCancel={handleCancel} isModalOpen={isModalOpen} />
      <RoutesMain
        showModal={showModal}
        searchAd={searchAd}
        setSearchAd={setSearchAd}
      />
      <Footer />
    </div>
  );
};

export default App;
