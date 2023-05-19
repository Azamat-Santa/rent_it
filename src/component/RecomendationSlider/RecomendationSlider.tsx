
import "./recomendationSlider.scss";
import Slider from "react-slick";
import { dataViewPage } from "../../consts/dataMock";
import ProductCard from "../Card/ProductCard/ProductCard";
import { SETTINGS } from "../../consts/slidersSettings/recomendationSliderConst";

const RecomendationSlider = () => {

  return (
    <div className="carousel-wrapper">
      <Slider {...SETTINGS}>
        {dataViewPage &&  dataViewPage.map((product: any) => (
          <ProductCard product={product} key={product.id} />
        ))
      }
      </Slider>
    </div>
  );
};

export default RecomendationSlider;
