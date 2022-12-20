import { useState, useEffect, useMemo } from "react";
import SearchBlock from "../../component/SearchBlock/SearchBlock";
import "./product.scss";
import Title from "../../component/Title/Title";
import moment from "moment";
import ProductCard from "./../../component/ProductCard/ProductCard";
import Modal from "antd/lib/modal/Modal";
import { message, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import { reviewApi } from "../../api/review";
import { useSelector } from "react-redux";
import { bookingApi } from "./../../api/booking";
import { useFormik } from "formik";
import { Map2Gis } from "./../../component/Map2Gis/Map2Gis";
import { adApi } from "../../api/ad";
import { chatApi } from "./../../api/chat";
import { userApi } from "../../api/userApi";
import {
  validationReviewSchema,
  ValidationSchemaForm,
} from "./validationSchemaProduct";
import { useDebounce } from "../../hook/useDebounce";
import ProductModalCalendar from "./component/ProductModalCalendar";
import ProductModalBookingForm from "./component/ProductModalBookingForm";
import ProductInstruction from "./component/ProductInstruction";
import ProductModalComplane from "./component/ProductModalComplane";
import Review from "./component/Review";
import FormReview from "../../component/FormReview/FormReview";
import ProductOwner from "./component/ProductOwner";
import ProductImgsCarousel from "./component/ProductImgsCarousel";

const Product = ({ searchAd, setSearchAd }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isCalendarModalFormOpen, setIsCalendarModalFormOpen] = useState(false);
  const [month, setMonth] = useState(moment().format("M"));
  const [year, setYear] = useState(moment().format("Y"));
  const [slideData, setSlideData] = useState<any>([]);
  const [isComplaintsModal, setIsComplaintsModal] = useState(false);
  const productId = localStorage.getItem("productId");
  const bookingGetAdOption = {
    productId,
    year,
    month,
  };
  const { data: bookingDataAd, isLoading: bookingAdLoading } =
    bookingApi.useGetBoookingAdQuery(bookingGetAdOption);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showCalendarModal = () => setIsCalendarModalOpen(true);
  const closeCalendarModal = () => setIsCalendarModalOpen(false);
  const [postReview, { data: postReviewData, isLoading: isLoadingPostReview }] =
    reviewApi.usePostReviewMutation();
  const [
    postBoookingAd,
    { data: postBoookingAdData, isLoading: isLoadingpostBoookingAd },
  ] = bookingApi.usePostBoookingAdMutation();

  const { data: getReviewData, isLoading: isLoadingGetReview } =
    reviewApi.useGetReviewQuery(productId);

  const userIsRegistrationComplete = useSelector(
    (state: any) => state.user.user.registrationComplete
  );
  const verifiedByTechSupport = useSelector(
    (state: any) => state.user.user.verifiedByTechSupport
  );

  const [
    fetchOneAd,
    { data: datailData, isLoading: datailLoading, isSuccess },
  ] = adApi.useLazyFetchOneAdQuery();
  const [fetchSimularAd, { data: simularAd, isLoading: isLoadingSimularAd }] =
    adApi.useLazyFetchSimularAdQuery();
  const [getOwenerId, { data: ownerData, isLoading: isLoadingOwnerId }] =
    userApi.useLazyGetOwenerIdQuery();
  const debouncedSearchTerm = useDebounce(searchAd, 500);
  const { data: searchData, isLoading: searchDataLoading } =
    adApi.useSearchDataQuery(debouncedSearchTerm, { skip: searchAd === "" });
  const [addChat, { data: addChatData, isLoading: addChatLoading }] =
    chatApi.useAdChatMutation();
  useEffect(() => {
    fetchOneAd(productId)
      .unwrap()
      .then((data) => {
        setSlideData(data.images);
        fetchSimularAd(data.categoryId);
        getOwenerId(data.ownerId);
      });
  }, []);

  const history = useNavigate();
  const onPanelChange = (day: any, mode: any) => {
    setMonth(day.format("M"));
    setYear(day.format("YYYY"));
  };

  const dateFullCellRender = (value: any) => {
    const listData = bookingDataAd.free;
    return (
      <div
        className={
          listData.includes(Number(value.format("D")))
            ? "booking__frey"
            : "booking__busy"
        }
        onClick={() => {
          setIsCalendarModalFormOpen(true);
        }}
      >
        {value.format("D")}
      </div>
    );
  };

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
        price: datailData.price,
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

  const formikValidationReview = useFormik({
    initialValues: {
      text: "",
      star: "",
    },
    validationSchema: validationReviewSchema,
    onSubmit: (value) => {
      const option = {
        productId: datailData.productId,
        ...value,
      };
      postReview(option).then((data: any) => {
        if (data?.error?.data.errors) {
          message.error(data?.error?.data.errors[0]);
        }
      });
    },
  });

  const userId = useSelector((state: any) => state.user.user.id);

  const booking = () => {
    if (userIsRegistrationComplete && verifiedByTechSupport === false) {
      setIsModalOpen(true);
    } else if (userIsRegistrationComplete && verifiedByTechSupport) {
      showCalendarModal();
    } else {
      history("/fullRegistration");
    }
  };
  const addChatFunc = () => {
    const parametr = {
      sender_id: userId,
      receiver_id: datailData.ownerId,
    };
    addChat(parametr).then(() => {
      history("/favorite/2");
    });
  };
   moment.updateLocale("ru", {
    weekdaysMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  });
  moment.updateLocale("ru", {
    monthsShort: [
      "Янв",
      "Февр",
      "Март",
      "Апр",
      "Май",
      "Июнь",
      "Июль",
      "Авг",
      "Сент",
      "Окт",
      "Нояб",
      "Дек",
    ],
  });
  return (
    <div className="product ">
      {datailData ? (
        <>
          <div className="content">
            <SearchBlock searchAd={searchAd} setSearchAd={setSearchAd} />
            {searchAd.length !== 0 && (
              <div className="main__product__right">
                {searchData &&
                searchData !== undefined &&
                searchData.length !== 0 ? (
                  searchData.map((product: any) => (
                    <ProductCard
                      product={product}
                      key={product.id}
                      showModal={showModal}
                    />
                  ))
                ) : searchDataLoading ? (
                  <div>{searchDataLoading ? <Spinner color="blue" /> : ""}</div>
                ) : (
                  <div>По вашему запросу не найдено обьявлений!!</div>
                )}
              </div>
            )}
            <ProductModalCalendar
              dateFullCellRender={dateFullCellRender}
              isCalendarModalOpen={isCalendarModalOpen}
              closeCalendarModal={closeCalendarModal}
              onPanelChange={onPanelChange}
            />
            <ProductModalBookingForm
              formikFormBooking={formikFormBooking}
              isCalendarModalFormOpen={isCalendarModalFormOpen}
              setIsCalendarModalFormOpen={setIsCalendarModalFormOpen}
              bookingDataAd={bookingDataAd}
              isLoadingpostBoookingAd={isLoadingpostBoookingAd}
            />

            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              width="720px"
            >
              <Title
                text="Идет проверка ваших данных занимает 1-2 рабочих дней"
                size="24px"
                textAlign="center"
              />
            </Modal>

            <ProductModalComplane
              ownerData={ownerData}
              setIsComplaintsModal={setIsComplaintsModal}
              isComplaintsModal={isComplaintsModal}
            />

            <div className="product__main__block">
              <ProductImgsCarousel slideData={slideData} />

              <div className="product__main__block__right">
                <div className="product__main__block__right__top">
                  <Title
                    text={datailData.title}
                    typeClass="productDescTitle"
                    margin="1px"
                  />
                  <Title
                    text={`${datailData.price} сом/ день`}
                    typeClass="productPriceTitle"
                    margin="0px"
                  />
                  <div style={{ marginBottom: "20px" }}>
                    <Rate disabled defaultValue={datailData.rating} />
                    <span>{getReviewData && getReviewData.length} отзывов</span>
                  </div>
                </div>
                {ownerData ? (
                  <ProductOwner
                    ownerData={ownerData}
                    setIsComplaintsModal={setIsComplaintsModal}
                  />
                ) : (
                  <Spinner color={"blue"} />
                )}
                <div className="product__main__block__right__bottom">
                  <button
                    className="button product-button"
                    onClick={addChatFunc}
                  >
                    {addChatLoading ? <Spinner color={"blue"} /> : "Написать"}
                  </button>
                  <button className="button product-button" onClick={booking}>
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
            <div className="product__characteristic">
              <div className="product__characteristic__right">
                <Title text="Характеристика" typeClass="smallTitle" />
                {Object.keys(datailData.characteristics).map((key) => (
                  <div key={key}>
                    {key}: {datailData.characteristics[key]}
                  </div>
                ))}
              </div>
              <div className="product__characteristic__left">
                <Map2Gis res={datailData} />
              </div>
            </div>
          </div>
          <ProductInstruction />
          <div className="content">
            <Review getReviewData={getReviewData} />
            {/* <FormReview/> */}
            <form
              className="form-review"
              onSubmit={formikValidationReview.handleSubmit}
            >
              <Title text="Написать отзыв" typeClass="smallTitle" />
              <div className="form-review__rate-load">
                <div>Оцените товар</div>
                <Rate
                  value={Number(formikValidationReview.values.star)}
                  onChange={(raiting) =>
                    formikValidationReview.setFieldValue("star", raiting)
                  }
                />
                {formikValidationReview.errors.star &&
                  formikValidationReview.touched.star && (
                    <div className="input__error">
                      {formikValidationReview.errors.star}
                    </div>
                  )}
              </div>

              <div className="form-review__block__right">
                <textarea
                  placeholder="Ваш отзыв"
                  id="text"
                  name="text"
                  onChange={formikValidationReview.handleChange}
                  onBlur={formikValidationReview.handleBlur}
                  value={formikValidationReview.values.text}
                />
                {formikValidationReview.errors.text &&
                  formikValidationReview.touched.text && (
                    <div className="input__error">
                      {formikValidationReview.errors.text}
                    </div>
                  )}
              </div>

              <button className="button review-button" type="submit">
                {isLoadingPostReview ? (
                  <Spinner color={"white"} />
                ) : (
                  "Отправить"
                )}
              </button>
            </form>

            <div className="look-further">
              <Title text="Смотрите также" typeClass="productDescTitle" />
              <div className="main__product__right">
                {simularAd &&
                  simularAd.map((card: any) => (
                    <ProductCard product={card} key={card.id} />
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="product__loader">
          <Spinner color={"blue"} />
        </div>
      )}
    </div>
  );
};

export default Product;
