import Spinner from '../../../../component/Spinner/Spinner';

const BookingConfirmCard = ({confirm,booking,isLoadingPutBookingConfirmAccept}:any) => {
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
          <div className="booking-confirm__card__top__right">{confirm.totalPrice} сом/ день</div>
        </div>

        <div className="booking-confirm__card__bottom">
            Пользователь {confirm.clientName} хочет забронировать товар с {confirm.bookDateFrom} по {confirm.bookDateTill}
           <div>
            <button 
            className="button"
            onClick={()=>booking(confirm)}
            >{isLoadingPutBookingConfirmAccept ? <Spinner color={'white'}/>:'Принять'}</button>
            <button className="button">Отклонить</button>
           </div>
        </div>
      </div>
    );
};

export default BookingConfirmCard;
