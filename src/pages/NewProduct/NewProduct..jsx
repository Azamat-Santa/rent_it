import { useCallback, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, message, Spin } from "antd";
import { useFormik } from "formik";
import Title from "../../component/UI/Title/Title";
import InputEdit from "../../component/UI/InputEdit/InputEdit";
import EditTextArea from "../../component/UI/EditTextArea/EditTextArea";
import Spinner from "../../component/UI/Spinner/Spinner";
import { useGetCategoryByIdQuery } from "../../core/api/categories";
import { sortInitialState } from "../../core/helpers";
import { adApi } from "../../core/api/ad";
import "./newProduct.scss";
import { validationSchemaNewAd } from "../../consts/validationSchema/validationSchemaNewAd";
import { useDebounce } from "../../core/hook/useDebounce";
import { img } from "../../assets/img/indexImg";



const NewProduct = () => {
  const [file, setFile] = useState();
  const [images, setImages] = useState();
  const [curentFieldValue, setCurentFieldValue] = useState(0);
  const [isCategoryIctive, setIsCategoryIctive] = useState(false);
  const [isCategoryName, setIsCategoryName] = useState("Категории");
  const [searchData, setsearchData] = useState();
  const [isSearchData, setIsSearchData] = useState(false);
  const [initialStateFormik, setInitialStateFormik] = useState({
    title: "",
    description: "",
    price: "",
    currency: "сом",
    bookDateFrom: "",
    bookDateTill: "",
    addres: "",
    locationX: '',
    locationY: '',
    categoryId: 0,
    image:'',
    fieldValue: {
      ...curentFieldValue,
    },
  });
const navigate = useNavigate()
  const { data: categoryByIdData, isLoading: categoryByIdLoading } =
    useGetCategoryByIdQuery();
  const [addNewAdDto, { data: newAdDtoData, isLoading: newAdDtoLoading }] =
    adApi.useAddNewAdDtoMutation();
  const [addNewAdImage, { data: newAdDtoimage, isLoading: newAdimageLoading }] =
    adApi.useAddNewAdImageMutation();
  const inputFileRef = useRef(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const newProduct = async (adDto) => {
    addNewAdDto(adDto).then((data) => {
      Object.values(file).map(async (f, index) => {
        console.log();
        const formData = new FormData();
        formData.append(`file`, f);
        const imageParametr = {
          formData: formData,
          productId: data.data.productId,
          imageOrderNumber: index + 1,
        };
        addNewAdImage(imageParametr).then((data) => {
          if (data && file.length === index + 1 ) {
            message.success("Объявление успешно создано!", 2);
            navigate('/')
          }
        });
      });
    });
  };

  const addImg = () => {
    inputFileRef.current.click();
  };
  const onSelectImage = useCallback((e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setImages(
      files.map((file) => ({
        file,
        blobUrl: URL.createObjectURL(new Blob([file])),
      }))
    );
    setFile(e.target.files);
    formikAddNewProduct.setFieldValue('image',e.target.files)
  }, []);

  const categoryCurrent = async (categoryIndex, categoryName) => {
    setIsCategoryIctive(false);
    setIsCategoryName(categoryName);
    setCurentFieldValue(categoryIndex);
    setInitialStateFormik((prev) => ({
      ...prev,
      title:formikAddNewProduct.values.title,
      image:formikAddNewProduct.values.image,
      categoryId: categoryIndex + 1,
      fieldValue: {
        ...categoryByIdData[categoryIndex].fields,
      },
    }));
  };
 
  
  const formikAddNewProduct = useFormik({
    initialValues: initialStateFormik,
    enableReinitialize: true,
    validationSchema:validationSchemaNewAd,
    onSubmit: (ad) => {
      const { addres, image, ...rest } = ad;
      const sortAd = sortInitialState(rest);
      newProduct(sortAd);
    },
  });


  const searchUsers = useDebounce(async (value) => {
    const res = await axios
      .get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_API_YANDEX_KEY}&format=json&geocode=Кыргызстан ${value}`
      )
      .then((data) => {
        setsearchData(data.data.response.GeoObjectCollection.featureMember);
      });
  }, 500);

  const changeSearchHandler = useCallback(async (e) => {
    setIsSearchData(true);
    formikAddNewProduct.setFieldValue("addres", e.target.value);
    searchUsers(e.target.value);
  }, []);

  return (
    <div className="new-product">
      <form onSubmit={formikAddNewProduct.handleSubmit}>
        <Title text="Создать объявление" />
        <Title
          text="Загрузить фото (до 5 шт)"
          size="24px"
          color="rgba(91, 90, 90, 1)"
        />
        <div className="new-product__imgs " onClick={addImg}>
          <img src={img.imgIcon} alt="" />
          {images &&
            images.map((el) => (
              <div key={el.blobUrl}>
                <img src={el.blobUrl} alt="" />{" "}
              </div>
          ))}
          <input
            ref={inputFileRef}
            type="file"
            multiple
            onChange={onSelectImage}
          />
          {formikAddNewProduct.errors.image &&
            formikAddNewProduct.touched.image && (
                  <div className="input__error add">
                    {formikAddNewProduct.errors.image}
                  </div>
          )}
        </div>
        
        <div className="block-input">
        <InputEdit
          id="title"
          placeholder="Название"
          createInput
          name="title"
          typeClass="formInput"
          onChange={formikAddNewProduct.handleChange}
          onBlur={formikAddNewProduct.handleBlur}
          value={formikAddNewProduct.values.title}
          type="text"
        />
          {formikAddNewProduct.errors.title &&
            formikAddNewProduct.touched.title && (
                  <div className="input__error add">
                    {formikAddNewProduct.errors.title}
                  </div>
          )}
        </div>
        
        <div className="new-product__category__wrapper">
          <div
            className="new-product__category"
            onClick={() => setIsCategoryIctive(!isCategoryIctive)}
          >
            {isCategoryName}
          </div>

          {isCategoryIctive && (
            <div className="new-product__category__items">
              {categoryByIdData ?
                categoryByIdData.map((category, index) => (
                  <div
                    onClick={() => {
                      categoryCurrent(index, category.name);
                    }}
                    key={category.name}
                  >
                    {category.name}
                  </div>
                )):<Spinner/>}
            </div>
          )}
        </div>
        {formikAddNewProduct.values?.fieldValue ? (
          Object.keys(formikAddNewProduct.values?.fieldValue).map((el, idx) => {
            return (
              <div key={el}>
                <InputEdit
                  key={el}
                  placeholder={el}
                  createInput
                  name={el}
                  id={el}
                  onChange={formikAddNewProduct.handleChange}
                  onBlur={formikAddNewProduct.handleBlur}
                  value={formikAddNewProduct.values?.fieldValue.el}
                  type="text"
                />

                {formikAddNewProduct.errors?.el &&
                  formikAddNewProduct.touched?.el && (
                    <div className="input__error">
                      {formikAddNewProduct.errors?.el}
                    </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className="new-product__category__items__loading"
            style={{
              display: categoryByIdLoading ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {categoryByIdLoading ? <Spinner color="blue" /> : null}
          </div>
        )}
        <div className="new-product__date">
         <div className="block-input">
         <DatePicker 
            name="bookDateFrom"
            id="bookDateFrom"
            className="picker" 
            placeholder="От"
            onBlur={formikAddNewProduct.handleBlur}
            onChange={(value)=>{
              console.log(value.format('YYYY-MM-DD'))
              formikAddNewProduct.setFieldValue('bookDateFrom',value.format('YYYY-MM-DD'))
            }}
          />
          {formikAddNewProduct.errors.bookDateFrom &&
            formikAddNewProduct.touched.bookDateFrom && (
              <div className="input__error add">
                {formikAddNewProduct.errors.bookDateFrom}
              </div>
          )}
         </div>
         <div className="block-input">
         <DatePicker 
            className="picker" 
            name="bookDateTill"
            id="bookDateTill"
            placeholder="До" 
            onBlur={formikAddNewProduct.handleBlur}
            onChange={(value)=>{
              console.log(value.format('YYYY-MM-DD'))
              formikAddNewProduct.setFieldValue('bookDateTill',value.format('YYYY-MM-DD'))
            }}
          />
           {formikAddNewProduct.errors.bookDateTill &&
            formikAddNewProduct.touched.bookDateTill && (
            <div className="input__error add">
              {formikAddNewProduct.errors.bookDateTill}
            </div>
            )}
         </div>
         
        </div>
        <div className="block-input">
          <InputEdit
          placeholder="Цена"
          createInput
          name="price"
          id="price"
          typeClass="formInput"
          onChange={formikAddNewProduct.handleChange}
          onBlur={formikAddNewProduct.handleBlur}
          value={formikAddNewProduct.values.price}
          type="number"
        />
         {formikAddNewProduct.errors.price &&
            formikAddNewProduct.touched.price && (
            <div className="input__error add">
              {formikAddNewProduct.errors.price}
            </div>
            )}
       </div>
       <div className="block-input">
       <InputEdit
          id="addres"
          placeholder="Адрес"
          createInput
          name="addres"
          typeClass="formInput"
          onChange={changeSearchHandler}
          onBlur={formikAddNewProduct.handleBlur}
          value={formikAddNewProduct.values.addres}
          type="text"
        />
          {formikAddNewProduct.errors.addres &&
            formikAddNewProduct.touched.addres && (
            <div className="input__error add">
              {formikAddNewProduct.errors.addres}
            </div>
            )}
       </div> 
       <div className="new-product__category__wrapper">
       {isSearchData && (
          <div className="new-product__category__items">
            {searchData ?
              searchData.map((category, index) => (
                <div
                  onClick={() => {
                    formikAddNewProduct.setFieldValue(
                      "addres",
                      category.GeoObject.metaDataProperty.GeocoderMetaData.text
                    );
                    setIsSearchData(false);
                    const subX = category.GeoObject.Point.pos.split(" ")[0];
                    const subY = category.GeoObject.Point.pos.split(" ")[1];
                    formikAddNewProduct.setFieldValue(
                      "locationX",
                      Number(subX)
                    );
                    formikAddNewProduct.setFieldValue(
                      "locationY",
                      Number(subY)
                    );
                  }}
                  key={
                    category.GeoObject.metaDataProperty.GeocoderMetaData.text
                  }
                >
                  {category.GeoObject.metaDataProperty.GeocoderMetaData.text}
                </div>
              )):<Spinner/>}
          </div>
        )}
       </div>
        
        <div className="block-input">
        <EditTextArea
          placeholder="Описание"
          createInput
          name="description"
          id="description"
          onChange={formikAddNewProduct.handleChange}
          onBlur={formikAddNewProduct.handleBlur}
          value={formikAddNewProduct.values.description}
          type="text"
        />
          {formikAddNewProduct.errors.description &&
            formikAddNewProduct.touched.description && (
            <div className="input__error add">
              {formikAddNewProduct.errors.description}
            </div>
          )}
        </div>
       
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button type="submit" className="button">
            {newAdDtoLoading || newAdimageLoading ? <Spin indicator={antIcon} /> : "Опубликовать"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
