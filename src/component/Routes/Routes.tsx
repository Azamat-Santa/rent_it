import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import TechSupportMain from "../../TechnicalSupport/pages/TechSupportMain/TechSupportMain";
import TechSupportUserDatail from "../../TechnicalSupport/pages/TeschSupportUserDateail/TechSupportUserDatail";
import OwnerProfile from "../../pages/OwnerProfile/OwnerProfile";
import Main from "../../pages/Main/Main";
import Product from "../../pages/Product/Product";
import Profile from "../../pages/Profile/Profile";
import NewProduct from "../../pages/NewProduct/NewProduct.";
import FullRegistration from "../../pages/FullRegistration/FullRegistration";
import Favorites from "../../pages/Favorites/Favorites";
import AdminMain from "../../admin/pages/Main/AdminMain";
import { routeEndpoints } from "../../consts/routeEndpoints";

const RoutesMain = ({showModal,searchAd,setSearchAd}:any) => {
  const user = useSelector((state: any) => state.user.user);
  const ProtectedRoute = ({ user, children }: any) => {
    if (user.role !== "ADMIN" && user.role !== "TECH_SUPPORT") {
      return <Navigate to="/" replace />;
    }
    return children;
  };
  return (
    <Routes>
      <Route
        path={routeEndpoints.main}
        element={
          <Main
            showModal={showModal}
            searchAd={searchAd}
            setSearchAd={setSearchAd}
          />
        }
      />
      <Route path={routeEndpoints.favorite} element={<Favorites />} />
      <Route
        path={routeEndpoints.productDatail}
        element={<Product searchAd={searchAd} setSearchAd={setSearchAd} />}
      />
      <Route path={routeEndpoints.ownerProfile} element={<OwnerProfile />} />
      <Route path={routeEndpoints.profile} element={<Profile />} />
      <Route path={routeEndpoints.fullRegistration} element={<FullRegistration />} />
      <Route path={routeEndpoints.newProduct} element={<NewProduct />} />
      <Route
        path={routeEndpoints.admin}
        element={
          <ProtectedRoute user={user}>
            <AdminMain />
          </ProtectedRoute>
        }
      />
      <Route
        path={routeEndpoints.techSupport}
        element={
          <ProtectedRoute user={user}>
            <TechSupportMain />
          </ProtectedRoute>
        }
      />
      <Route
        path={routeEndpoints.techSupportUserDatail}
        element={
          <ProtectedRoute user={user}>
            <TechSupportUserDatail />
          </ProtectedRoute>
        }
      />
      <Route path={routeEndpoints.redirect} element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesMain;
