import { FC ,useState} from "react";
import { img } from "../../assets/img/indexImg";
import "./productCard.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { adApi } from "../../api/ad";
import { message } from "antd";
interface IProductCard {
  product: any ;
  showModal?: () => void ;
}



const ProductCard: FC<IProductCard> = ({ product, showModal }) => {
  const isAuth = useSelector((state:any)=>state.user.isAuth)
  const history = useNavigate();

  const [postFavorites,{data}] = adApi.usePostFavoritesMutation()
  const [deleteFavorites,{data:deleteFavoriteData}] = adApi.useDeleteFavoritesMutation()
  return (
    <div className="product-card" key={product.id} >
      <div onClick={()=>{
       if(!isAuth){
        showModal?.()
       }else{
        history('/product') 
        localStorage.setItem('productId', product.productId)
       }
      }}>
      <img src={product.mainImageUrl === null ? 'https://brilliant24.ru/files/cat/template_01.png' : product.mainImageUrl } alt="" className="product-card__img" />
      <div>{product.title}</div>
      <div>{product.price} сом/день</div>
      </div>
      
      <img 
         src={  product.favorite ?  img.favoriteIconFull : img.favoriteIcon } 
         alt="" className="product-card__icon__favorite" 
         onClick={()=>{
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
         }}
      />
     
    </div>
  );
};

export default ProductCard;
