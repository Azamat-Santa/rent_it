import { useState, useEffect, useMemo } from "react";
import SearchBlock from "../../component/SearchBlock/SearchBlock";
import "./product.scss";
import Title from "../../component/UI/Title/Title";
import moment from "moment";
import ProductCard from "../../component/Card/ProductCard/ProductCard";
import Modal from "antd/lib/modal/Modal";
import { message, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../component/UI/Spinner/Spinner";
import { reviewApi } from "../../core/api/review";
import { useSelector } from "react-redux";
import { bookingApi } from "../../core/api/booking";
import { useFormik } from "formik";
import { adApi } from "../../core/api/ad";
import { chatApi } from "../../core/api/chat";
import { userApi } from "../../core/api/userApi";
import {
  validationReviewSchema,
} from "../../consts/validationSchema/validationSchemaProduct";
import { useDebounce } from "../../core/hook/useDebounce";
import ProductModalCalendar from "../../component/Modal/ProductModalCalendar";
import ProductModalBookingForm from "../../component/Modal/ProductModalBookingForm";
import ProductInstruction from "../../component/ProductInstruction";
import ProductModalComplane from "../../component/Modal/ProductModalComplane";
import Review from "../../component/Review";
import FormReview from "../../component/FormReview/FormReview";
import ProductOwner from "../../component/ProductOwner";
import ProductImgsCarousel from "../../component/ProductImgsCarousel";
import { routeEndpoints } from "../../consts/routeEndpoints";
import { YandexMap } from "../../component/Map2Gis/YandexMap";
import { Dayjs } from "dayjs";

const Product = ({ searchAd, setSearchAd }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isCalendarModalFormOpen, setIsCalendarModalFormOpen] = useState(false);
  const [month, setMonth] = useState(moment().format("M"));
  const [year, setYear] = useState(moment().format("Y"));
  const [slideData, setSlideData] = useState<any>([]);
  const [isComplaintsModal, setIsComplaintsModal] = useState(false);
  const {productId}= useParams()
  const bookingGetAdOption = {
    productId,
    year,
    month,
  };
 
  const user = useSelector(
    (state: any) => state.user.user
  );
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
  
  const { data: getReviewData, isLoading: isLoadingGetReview } =
    reviewApi.useGetReviewQuery(productId);
  const [
    fetchOneAd,
    { data: datailData, isLoading: datailLoading, isSuccess },
  ] = adApi.useLazyFetchOneAdQuery();
  const [fetchSimularAd, { data: simularAd, isLoading: isLoadingSimularAd }] =
    adApi.useLazyFetchSimularAdQuery();
  const [getOwenerId, { data: ownerData, isLoading: isLoadingOwnerId }] =
    userApi.useLazyGetOwenerIdQuery();
  const { data: searchData, isLoading: searchDataLoading } =
    adApi.useSearchDataQuery(searchAd, { skip: searchAd === ""  || searchAd === undefined });
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
  const onPanelChange = (day:Dayjs) => {
    setMonth(day.format("M"));
    setYear(day.format("YYYY"));
  };

  const dateFullCellRender = (value: Dayjs) => {
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



  const formikValidationReview = useFormik({
    initialValues: {
      text: "",
      star: "",
    },
    validationSchema: validationReviewSchema,
    onSubmit: (value) => {
      const option = {
        productId: datailData?.productId,
        ...value,
      };
      postReview(option).then((data: any) => {
        if (data?.error?.data.errors) {
          message.error(data?.error?.data.errors[0]);
        }
      });
    },
  });
  const booking = () => {
    if (user.registrationComplete && user.verifiedByTechSupport === false) {
      setIsModalOpen(true);
    } else if (user.registrationComplete && user.verifiedByTechSupport) {
      showCalendarModal();
    } else {
      history(routeEndpoints.fullRegistration);
    }
  };
  const addChatFunc = () => {
    const parametr = {
      sender_id: user.id,
      receiver_id: datailData?.ownerId,
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
  const renderSearchData = () =>{
    if(searchData && searchData !== undefined && searchData.length !== 0 ){
      return searchData.map((product: any) => (
        <ProductCard
          product={product}
          key={product.id}
          showModal={showModal}
        />
      ))
    }else if (searchDataLoading){
      return  <div>{searchDataLoading ? <Spinner color="blue" /> : ""}</div>
    }else{
      return <div>По вашему запросу не найдено обьявлений!!</div>
  }}
  return (
    <div className="product ">
      {datailData ? (
        <>
          <div className="content">
            <SearchBlock searchAd={searchAd} setSearchAd={setSearchAd} />
            {searchAd.length !== 0 && (
              <div className="main__product__right search-block">
                {renderSearchData()}
              </div>
            )}
            <ProductModalCalendar
              dateFullCellRender={dateFullCellRender}
              isCalendarModalOpen={isCalendarModalOpen}
              closeCalendarModal={closeCalendarModal}
              onPanelChange={onPanelChange}
            />
            <ProductModalBookingForm
              productId={productId}
              isCalendarModalFormOpen={isCalendarModalFormOpen}
              setIsCalendarModalFormOpen={setIsCalendarModalFormOpen}
              bookingDataAd={bookingDataAd}
              datailData={datailData}
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
                    <Rate disabled defaultValue={Number(datailData.rating)} />
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
                <YandexMap res={datailData} />
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
