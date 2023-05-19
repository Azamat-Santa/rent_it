import { Modal, DatePicker, message } from "antd";
import { useFormik } from "formik";
import { ValidationSchemaForm } from "../../consts/validationSchema/validationSchemaProduct";
import { bookingApi } from "../../core/api/booking";
import Spinner from "../UI/Spinner/Spinner";
import { IAdDatails } from './../../core/types/IAdDatails';
import { FC } from 'react';

interface ProductModalBookingFormProps {
  isCalendarModalFormOpen:boolean;
  setIsCalendarModalFormOpen:(active:boolean)=>void;
  productId:string | undefined;
  datailData:IAdDatails;
  bookingDataAd:any;
}

const ProductModalBookingForm :FC<ProductModalBookingFormProps> = ({
  isCalendarModalFormOpen,
  setIsCalendarModalFormOpen,
  productId,
  datailData,
  bookingDataAd
}) => {

  const [
    postBoookingAd,
    { data: postBoookingAdData, isLoading: isLoadingpostBoookingAd },
  ] = bookingApi.usePostBoookingAdMutation();

  const formikFormBooking = useFormik({
    initialValues: {
      dateFrom: "",
      dateTill: "",
    },
    validationSchema: ValidationSchemaForm,
    onSubmit: (value) => {
      const options = {
        productId,
        dateFrom: value.dateFrom,
        dateTill: value.dateTill,
        price: datailData?.price,
      };
      postBoookingAd(options).then((data: any) => {
        if (data?.error) {
          message.error(data?.error?.data?.errors[0], 3);
          setIsCalendarModalFormOpen(false);
        }
        if (data?.data) {
          setIsCalendarModalFormOpen(false);
          message.success(
            "Успешно забронировано, ожидайте подтверждения арендоталем!!!",
            3
          );
        }
      });
    },
  });
  return (
    <Modal
      open={isCalendarModalFormOpen}
      onCancel={() => setIsCalendarModalFormOpen(false)}
      footer={null}
      width="720px"
      title="Бронирование"
    >
      <form
        className="product__modal__form"
        onSubmit={formikFormBooking.handleSubmit}
      >
        <div className="product__modal__form__datepicker date-picker-booking">
          <div className="block-input">
            <DatePicker
              placeholder="От"
              name="dateFrom"
              id="dateFrom"
              dateRender={(currentDate, today) => {
                const listData = bookingDataAd.free;
                return (
                  <div
                    className={
                      listData.includes(Number(currentDate.format("D")))
                        ? "date-picker-booking__frey"
                        : "date-picker-booking__busy"
                    }
                    onClick={() => {
                      setIsCalendarModalFormOpen(true);
                    }}
                  >
                    {currentDate.format("D")}
                  </div>
                );
              }}
              onChange={(value) => {
                formikFormBooking.setFieldValue(
                  "dateFrom",
                  value?.format("YYYY-M-D")
                );
              }}
            />
            {formikFormBooking.errors.dateFrom &&
              formikFormBooking.touched.dateFrom && (
                <div className="input__error booking">
                  {formikFormBooking.errors.dateFrom}
                </div>
              )}
          </div>

          <div className="block-input">
            <DatePicker
              placeholder="До"
              name="dateTill"
              id="dateTill"
              onChange={(value) => {
                formikFormBooking.setFieldValue(
                  "dateTill",
                  value?.format("YYYY-M-D")
                );
              }}
              dateRender={(currentDate, today) => {
                const listData = bookingDataAd.free;
                return (
                  <div
                    className={
                      listData.includes(Number(currentDate.format("D")))
                        ? "date-picker-booking__frey"
                        : "date-picker-booking__busy"
                    }
                    onClick={() => {
                      setIsCalendarModalFormOpen(true);
                    }}
                  >
                    {currentDate.format("D")}
                  </div>
                );
              }}
            />
            {formikFormBooking.errors.dateTill &&
              formikFormBooking.touched.dateTill && (
                <div className="input__error booking">
                  {formikFormBooking.errors.dateTill}
                </div>
              )}
          </div>
        </div>
        <button className="button base-button" type="submit" onClick={() => {}}>
          {isLoadingpostBoookingAd ? (
            <Spinner color={"white"} />
          ) : (
            "Забронировать"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default ProductModalBookingForm;
