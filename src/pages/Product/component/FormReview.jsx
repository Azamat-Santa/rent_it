import React from 'react';
import Title from '../../../component/Title/Title';
import { Rate, message } from 'antd';
import { reviewApi } from '../../../api/review';
import { validationReviewSchema } from '../validationSchemaProduct';
import { useFormik } from 'formik';
import Spinner from '../../../component/Spinner/Spinner';

const FormReview = ({datailData}) => {
    const [postReview, { data: postReviewData, isLoading: isLoadingPostReview }] =
    reviewApi.usePostReviewMutation();
    
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
          postReview(option).then((data) => {
            if (data?.error?.data.errors) {
              message.error(data?.error?.data.errors[0]);
            }
          });
        },
      });
    return (
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
    );
};

export default FormReview;