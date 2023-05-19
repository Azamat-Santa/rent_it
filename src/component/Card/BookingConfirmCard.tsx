import Spinner from "../UI/Spinner/Spinner";
import { FC } from 'react';
import { IUserBookingRequest } from "../../core/api/booking";
 
interface BookingConfirmCardProps {
  confirm: IUserBookingRequest;
  booking: (confirm : IUserBookingRequest)=> void;
  isLoading:boolean
}

const BookingConfirmCard : FC<BookingConfirmCardProps> = ({booking,confirm,isLoading}) => {
  return (
    <div className="booking-confirm__card">
      <div className="booking-confirm__card__top">
        <div className="booking-confirm__card__top__left">
          <img
            src={
              confirm.mainImageUrl
                ? confirm.mainImageUrl
                : "https://brilliant24.ru/files/cat/template_01.png"
            }
            alt=""
          />
        </div>
        <div className="booking-confirm__card__top__medium">
          {confirm.productTitle}
        </div>
        <div className="booking-confirm__card__top__right">
          {confirm.totalPrice} сом/ день
        </div>
      </div>

      <div className="booking-confirm__card__bottom">
        Пользователь {confirm.clientName} хочет забронировать товар с{" "}
        {confirm.bookDateFrom} по {confirm.bookDateTill}
        <div>
          <button className="button" onClick={() => booking(confirm)}>
            {isLoading ? (
              <Spinner color={"white"} />
            ) : (
              "Принять"
            )}
          </button>
          <button className="button">Отклонить</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmCard;
