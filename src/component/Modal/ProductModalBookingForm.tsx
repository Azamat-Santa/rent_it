import { Modal,DatePicker } from 'antd';
import Spinner from '../UI/Spinner/Spinner';

const ProductModalBookingForm = ({formikFormBooking,isCalendarModalFormOpen,setIsCalendarModalFormOpen,bookingDataAd,isLoadingpostBoookingAd}:any) => {
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
          <button
            className="button base-button"
            type="submit"
            onClick={() => {}}
          >
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