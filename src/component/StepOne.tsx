import Title from './UI/Title/Title';
import { DatePicker } from 'antd';
import Input from './UI/Input/Input';

const StepOne = ({formikStepOne}:any) => {

    return (
        <form onSubmit={formikStepOne.handleSubmit}>
        <div className="full-register__pasport__image">
          </div>
          <div className="block-input">
            <Input
              id="firstName"
              placeholder="Имя*"
              typeClass="formInput"
              name="firstName"
              onChange={formikStepOne.handleChange}
              onBlur={formikStepOne.handleBlur}
              value={formikStepOne.values.firstName}
              type="text"
            />
            {formikStepOne.errors.firstName &&
              formikStepOne.touched.firstName && (
                <div className="input__error">
                  {formikStepOne.errors.firstName}
                </div>
            )}
          </div>
          <div className="block-input">
            <Input
              id="lastName"
              placeholder="Фамилия"
              typeClass="formInput"
              name="lastName"
              onChange={formikStepOne.handleChange}
              onBlur={formikStepOne.handleBlur}
              value={formikStepOne.values.lastName}
              type="text"
            />
            {formikStepOne.errors.lastName &&
              formikStepOne.touched.lastName && (
                <div className="input__error">
                  {formikStepOne.errors.lastName}
                </div>
              )}
          </div>
          <div className="block-input">
            <Input
              id="middleName"
              placeholder="Отчество"
              typeClass="formInput"
              name="middleName"
              onChange={formikStepOne.handleChange}
              onBlur={formikStepOne.handleBlur}
              value={formikStepOne.values.middleName}
              type="text"
            />
            {formikStepOne.errors.middleName &&
              formikStepOne.touched.middleName && (
                <div className="input__error">
                  {formikStepOne.errors.middleName}
                </div>
              )}
          </div>
          <div className="block-input">
            <Input
              id="phoneNumber"
              placeholder="Номер телефона*"
              typeClass="formInput"
              name="phoneNumber"
              onChange={formikStepOne.handleChange}
              onBlur={formikStepOne.handleBlur}
              value={formikStepOne.values.phoneNumber}
              type="text"
            />
            {formikStepOne.errors.phoneNumber &&
              formikStepOne.touched.phoneNumber && (
                <div className="input__error">
                  {formikStepOne.errors.phoneNumber}
                </div>
              )}
          </div>

          <Title text="Дата рождения*" typeClass="smallTitle" size="20px" />
          <div className="full-register__dateOfBirth">
            <DatePicker
            placeholder="ДД"
            onChange={(newDate:any) => {
             formikStepOne.setFieldValue("dateOfBirth",newDate.format('YYYY-MM-DD'));
          }}
             />
          </div>
          <div className="full-register__handler">
            <div></div>
            <button className="full-register__next" type="submit">
              Вперед
            </button>
          </div>
        </form>
    );
};

export default StepOne;