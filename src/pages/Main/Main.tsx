import { useEffect, useState } from "react";
import "./main.scss";
import Title from "../../component/Title/Title";
import Slider from "../../component/RecomendationSlider/RecomendationSlider";
import { categoryList } from "../../data/categoryList";
import ProductCard from "../../component/ProductCard/ProductCard";
import SearchBlock from "../../component/SearchBlock/SearchBlock";
import { faqData } from "./faqData";
import { adApi } from "../../api/ad";
import Spinner from "../../component/Spinner/Spinner";
import "../../component/CategoryList/categoryList.scss";
import { useDebounce } from "../../hook/useDebounce";
import { img } from "../../assets/img/indexImg";

const Main = ({ showModal, searchAd,setSearchAd }: any) => {
  const [showFaq, setShowFaq] = useState(0);
  const [curentCategoryId, setCurentCategory] = useState(0);
  const [allData, setAllData] = useState(true);
  
  const faqHandler = (index: number) => {
    setShowFaq(index);
  };

  const {
    data: allAdd,
    isSuccess: isSuccessAlladd,
    isLoading: allAddLoading,
  } = adApi.useFetchAllAdsQuery();
  
  const {
    data: categoryByIdData = [],
    isSuccess: isSuccessCategoryAds,
    isLoading: categoryByIdLoading,
  } = adApi.useFetchByCategoryIdAdsQuery(curentCategoryId);

  
  useEffect(() => {}, [categoryByIdData]);

  const curentCategory = (idCutegory: number) => {
    if (idCutegory !== 0) {
      setCurentCategory(idCutegory);
      setAllData(false);
    } else {
      setCurentCategory(0);
      setAllData(true);
    }
  };
  
  const debouncedSearchTerm = useDebounce(searchAd, 500);
  const {data:searchData,isLoading:searchDataLoading} = adApi.useSearchDataQuery(searchAd,{ skip: searchAd === "" })
  console.log(searchData);
  
 

  return (
    <div className="main wrapper">
      <div className="content">
      <SearchBlock searchAd={searchAd} setSearchAd={setSearchAd}/>
      {
        searchAd.length !== 0 &&   
        <div className="main__product__right search-block">
        {searchData &&
         searchData !== undefined &&
         searchData.length !== 0 ? (
          searchData?.map((product: any) => (
            <ProductCard
              product={product}
              key={product.id}
              showModal={showModal}
            />
          ))
        ) : searchDataLoading ?
          <div>{searchDataLoading ? <Spinner color="blue" /> : ""}</div>
           :  (
          <div>По вашему запросу не найдено обьявлений!!</div>
        )
      }
      </div>
      }
      </div>
     
      <div className="main-title">
        <img src={img.banner} alt="" />
      </div>
      <div className="content">
        <Title text="Рекомендации" />
        <Slider />
        <div className="main__product">
          <div className="main__product__left">
            <div className="category__list">
              {categoryList.map((el, index) => (
                <div
                  key={el.name}
                  className={
                    index === curentCategoryId
                      ? "category__list__item active"
                      : "category__list__item"
                  }
                  onClick={() => curentCategory(el?.id)}
                >
                  {el.name}
                </div>
              ))}
            </div>
          </div>
          <div className="main__product__right">
            {!allData &&
              categoryByIdData !== undefined &&
              categoryByIdData.length !== 0 ? (
              categoryByIdData?.map((product: any) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  showModal={showModal}
                />
              ))
            ) : allData 
                && 
                allAdd !== undefined 
                && allAdd.length !== 0 ? (
                allAdd.map((product: any) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  showModal={showModal}
                />
              ))
            ) : (
              <div>{allAddLoading ? <Spinner color="blue" /> : ""}</div>
            )}
          </div>
        </div>
        <Title text="Часто задаваемые вопросы" />
        <div className="faq">
          {faqData.map((item, index) => (
            <div className="faq__block" key={index}>
              <div className="faq__question" onClick={() => faqHandler(index)}>
                {item.question}
              </div>
              {showFaq === index && (
                <div className="faq__answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
