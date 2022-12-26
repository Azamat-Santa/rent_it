import Title from './UI/Title/Title';
import { Rate } from 'antd';

const Review = ({getReviewData}:any) => {
    return (
        <div className="product__reviews ">
        <Title text="Отзывы" typeClass="productDescTitle" />
        {getReviewData !== undefined && getReviewData.length !== 0 ? (
          <div className="carousel-reviews">
            {getReviewData.map((r: any) => (
              <div className="reviews__card" key={r.name}>
                <div className="reviews__card__name">{r.name}</div>
                <div className="reviews__card__date">{r.date} </div>
                <Rate disabled defaultValue={r.star} />
                <div className="reviews__card__msg">{r.text}</div>
              </div>
            ))}
          </div>
        ) : getReviewData !== undefined && getReviewData.length === 0 ? (
          <div className="reviews__card">Оставьте свой отзыв!!!</div>
        ) : (
          "Ошибка подключения!"
        )}
      </div>
    );
};

export default Review;