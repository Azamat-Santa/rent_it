import ProductCard from "../../../component/ProductCard/ProductCard";
import { useState } from "react";
import { adApi } from "../../../api/ad";
import { bookingApi } from './../../../api/booking';

const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState({
    isFavorite: true,
    isRented: false,
  });
  
const {data:dataGetFavorites} = adApi.useGetMyFavoritesQuery('')
const {data:myBookings} = bookingApi.useGetMyBoookingQuery('')

  const handleFavorite = (text: string) => {
    if (text === "fav") {
      setIsFavorite({
        isFavorite: true,
        isRented: false,
      });
    } else {
      setIsFavorite({
        isFavorite: false,
        isRented: true,
      });
    }
  };

  return (
    <div>
        <div className="favorite-page__left__navigate">
          <div
            onClick={() => handleFavorite("fav")}
            className={
              isFavorite.isFavorite
                ? "favorite-page__left__navigate__item active"
                : "favorite-page__left__navigate__item"
            }
          >
            Избранные
          </div>
          <div
            onClick={() => handleFavorite("ren")}
            className={
              isFavorite.isRented
                ? "favorite-page__left__navigate__item active"
                : "favorite-page__left__navigate__item"
            }
          >
            Арендованные
          </div>
        </div>
        {isFavorite.isFavorite && (
          <div className="favorite-page__left__favorite">
            {dataGetFavorites  && dataGetFavorites !== undefined && dataGetFavorites.length !== 0 ?  dataGetFavorites.map((product:any) => (
              <ProductCard product={product} key={product.id}/>
            )):<div>Нет избранных</div>}
          </div>
        )}
        {isFavorite.isRented && (
          <div className="favorite-page__left__favorite">
            {myBookings && myBookings.map((product:any) => (
              <ProductCard product={product} key={product.id}/>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default Favorite;
