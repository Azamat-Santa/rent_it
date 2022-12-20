
import { bookingApi } from "./../../../../api/booking";
import "./bookingRequest.scss";
import { message } from 'antd';
import BookingConfirmCard from "../component/BookingConfirmCard";
const BookingRequests = () => {
  const { data: getBookingConfirm, isLoading: isLoadingGetBookingConfirm } = bookingApi.useGetBoookingConfirmQuery("");
  const [putBoookingAccept,{ data: putBookingConfirmAccept, isLoading: isLoadingPutBookingConfirmAccept }] = bookingApi.usePutBoookingAcceptMutation();
  const booking = (confirm:any)=>{
  putBoookingAccept(confirm.bookingId).then((data:any)=>{
      if (data?.error) {
          message.error(data?.error?.data?.errors[0], 3);
      }
      if (data?.data) {
          message.success("Успешно подтверждено!!!", 3);
      }
  })
}
  return (
    <div>
      {getBookingConfirm &&
        getBookingConfirm.map((confirm: any) => (
          <BookingConfirmCard confirm={confirm} booking={booking} isLoadingPutBookingConfirmAccept={isLoadingPutBookingConfirmAccept}/>
        ))}
    </div>
  );
};

export default BookingRequests;
