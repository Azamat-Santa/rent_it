import { FC, useState } from 'react';


interface ProductImgsCarouselpRrops {
  slideData : any
}

const ProductImgsCarousel: FC<ProductImgsCarouselpRrops> = ({slideData}) => {
  const [slideActive, setSlideActive] = useState(0);

    const nextSlide=() => {
        if (slideActive === slideData.length - 1) {
          setSlideActive(0);
        } else {
          setSlideActive(slideActive + 1);
        }
      }
      const prevSlide = () => {
        if (slideActive !== 0) {
          setSlideActive(slideActive - 1);
        } else {
          setSlideActive(slideData.length - 1);
        }
      }
    return (
        <div className="product__main__block__left">
                <div className="product__main__block__left__img">
                  <button
                    className="carousel__prev"
                    onClick={prevSlide}
                  ></button>
                  <img
                    src={
                      slideData !== undefined &&
                      slideData.length !== 0 &&
                      slideData[slideActive].imageUrl
                        ? slideData[slideActive].imageUrl
                        : "https://brilliant24.ru/files/cat/template_01.png"
                    }
                    alt=""
                  />
                  <button
                    className="carousel__next"
                    onClick={nextSlide}
                  ></button>
                </div>
                <div className="product__main__block__left__carousel">
                  {slideData !== undefined &&
                    slideData.length !== 0 &&
                    slideData?.map((image: any, index: number) => (
                      <img
                        src={
                          image.imageUrl
                            ? image.imageUrl
                            : "https://brilliant24.ru/files/cat/template_01.png"
                        }
                        alt=""
                        key={image.imageUrl}
                        onClick={() => {
                          setSlideActive(index);
                        }}
                        style={{
                          display: image.imageUrl ? "block" : "none",
                          border:
                            slideActive === index
                              ? "3px solid rgba(0, 108, 153, 1)"
                              : "",
                        }}
                      />
                    ))}
                </div>
              </div>
    );
};

export default ProductImgsCarousel;