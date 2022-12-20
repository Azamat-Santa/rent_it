
import "./recomendationSlider.scss";
import Slider from "react-slick";
import { dataMainPage } from "../../data/data";
import ProductCard from "../ProductCard/ProductCard";
import { adApi } from "../../api/ad";

const RecomendationSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {dataMainPage &&  dataMainPage.map((product: any) => (
          <ProductCard product={product} key={product.id} />
        ))
      }
      </Slider>
    </div>
  );
};

export default RecomendationSlider;
