import {useState,useEffect} from "react";
import Header from "./component/Header/Header";
import "./App.scss";
import Main from "./pages/Main/Main";
import Footer from "./component/Footer/Footer";
import { Routes, Route, Navigate, useLocation,  } from "react-router-dom";
import "antd/dist/reset.css";
import Favorites from "./pages/Favorites/Favorites";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import { useAppDispatch } from "./store";
import FullRegistration from "./pages/FullRegistration/FullRegistration";
import NewProduct from "./pages/NewProduct/NewProduct.";
import AdminMain from "./admin/pages/Main/AdminMain";
import { useSelector } from 'react-redux';
import AuthModal from "./component/AuthModal/AuthModal";
import { changeBackgroundOnBlue, changeBackgroundOnWhite } from "./store/reducers/ui";
import { authUser } from "./api/userAuth";
import TechSupportMain from './TechnicalSupport/pages/TechSupportMain/TechSupportMain';
import TechSupportUserDatail from "./TechnicalSupport/pages/TeschSupportUserDateail/TechSupportUserDatail";
import OwnerProfile from "./pages/OwnerProfile/OwnerProfile";



const App = () => {
  const [searchAd,setSearchAd] =useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation()
  const [refreshTocken,{data}] = authUser.useRefreshTockenMutation()
   useEffect(() => {
    const token = localStorage.getItem('accessTocken')
    const refreshToken = localStorage.getItem('refreshTocken')
    if(token){
      refreshTocken({refreshToken : refreshToken})
    }
   }, [])

   if(location.pathname ==='/fullRegistration' || location.pathname ==='/techSupport'){
    dispatch(changeBackgroundOnBlue('rgba(237, 247, 251, 1)'))

   }else{
    dispatch(changeBackgroundOnWhite('white'))
   }
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(()=>{
    if(location.pathname ==='/product'){
      setSearchAd('')
    }
  },[searchAd,location.pathname])
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const user = useSelector((state:any)=>state.user.user)
const ProtectedRoute = ({ user, children }:any) => {
  if (user.role !== 'ADMIN' && user.role !== 'TECH_SUPPORT') {
    return <Navigate to="/" replace />;
  }
  return children;
};


  const backgound = useSelector((state:any)=>state.uiSlice.backgound)

  return (
    <div style={{background:backgound}}>
      <Header showModal={showModal}/>
      <AuthModal handleCancel={handleCancel} isModalOpen={isModalOpen} />
      <Routes>
        <Route path="/" element={<Main showModal={showModal} searchAd={searchAd} setSearchAd={setSearchAd}/>} />
        <Route path="/favorite/:tabId" element={<Favorites />}/>
        <Route path="/product" element={<Product searchAd={searchAd} setSearchAd={setSearchAd} />} />
        <Route path="/ownerProfile/:ownerId" element={<OwnerProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fullRegistration" element={<FullRegistration />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <AdminMain />
            </ProtectedRoute>
          }
        />
         <Route
          path="/techSupport"
          element={
            <ProtectedRoute user={user}>
              <TechSupportMain />
            </ProtectedRoute>
          }
        />
          <Route
          path="/techSupportUserDatail/:userId"
          element={
            <ProtectedRoute user={user}>
               <TechSupportUserDatail />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
         />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
