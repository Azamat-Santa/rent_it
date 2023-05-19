import { FC } from "react";
import { img } from "../../../assets/img/indexImg";
import "./productCard.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { adApi} from "../../../core/api/ad";
import { message } from "antd";
import { IAd } from "../../../core/types/IAd";
interface IProductCard {
  product: IAd ;
  showModal?: () => void ;
}

const ProductCard: FC<IProductCard> = ({ product, showModal }) => {
  const isAuth = useSelector((state:any)=>state.user.isAuth)
  const history = useNavigate();
  const [postFavorites] = adApi.usePostFavoritesMutation()
  const [deleteFavorites] = adApi.useDeleteFavoritesMutation()

  const handlerFavorite = ()=>{
    !product.favorite ? postFavorites(product.productId).then((data:any)=>{
      console.log(data);
      if(data?.error?.originalStatus === 200){
        message.success("Успешно добавлено в избранное!!!")
      }
      if(data?.error?.data.errors[0] === 'You cannot add your product to favorites.'){
        message.error('Вы не можете добавить свой продукт в избранные')
      }
    }) : deleteFavorites(product.productId).then((data:any)=>{
      if(data?.error?.originalStatus ===200){
          message.success('Успешно удалено!!!')
      }else{
        message.error('Что то пошло не так!!!')
      }
    })
   }
   const productIsFavoriteIcon = (isFavorite:boolean) =>  isFavorite ?  img.favoriteIconFull : img.favoriteIcon 
   const handlerModal = ()=>{
    if(!isAuth){
     showModal?.()
    }else{
     history(`/product/${product.productId}`) 
    }
   }
   const productIsMainImage = (isMainImage:string) =>   isMainImage === null ? 'https://brilliant24.ru/files/cat/template_01.png' : product.mainImageUrl 
  
  
   return (
    <div className="product-card" >
      <div onClick={handlerModal}>
      <img src={productIsMainImage(product.mainImageUrl)} alt="" className="product-card__img" />
      <div>{product.title}</div>
      <div>{product.price} сом/день</div>
      </div>
      <img 
         src={productIsFavoriteIcon(product.favorite) } 
         alt="" className="product-card__icon__favorite" 
         onClick={handlerFavorite}
      />
    </div>
  );
};

export default ProductCard;
