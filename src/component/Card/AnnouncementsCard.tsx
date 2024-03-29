import { EditOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { FC } from 'react';
import { img } from '../../assets/img/indexImg';

interface AnnouncementsCardProps {
  product:any;
  showModal:(productId : number ,active : boolean) => void;
  openEditProduct:()=>void
}

const AnnouncementsCard : FC<AnnouncementsCardProps> = ({product,showModal,openEditProduct}) => {
    return (
        <div className="announcements__card" key={product.id}>
            <div className="announcements__card__left">
              <img
                src={
                  product.mainImageUrl === null
                    ? img.noAd
                    : product.mainImageUrl
                }
                alt=""
              />
            </div>
            <div className="announcements__card__middle">
              {product.title} <br />
              {product.price}
            </div>
            <div className="announcements__card__right">
              <div>
                <div
                  className="announcements__card__right__icon"
                  onClick={() => showModal(product.productId, product.active)}
                >
                  <Switch
                    id={String(product.id)}
                    size="small"
                    checked={product.active ? true : false}
                  />
                </div>

                <label htmlFor={String(product.id)}>
                  {product.active ? " Деактивировать" : "Активировать"}
                </label>
              </div>
              <div
                onClick={openEditProduct}
                className="announcements__card__right__edit"
              >
                <div className="announcements__card__right__icon">
                  <EditOutlined />
                </div>
                Редактировать
              </div>
            </div>
          </div>
    );
};

export default AnnouncementsCard;