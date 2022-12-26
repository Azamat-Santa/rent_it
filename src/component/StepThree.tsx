import Input from './UI/Input/Input';
import Title from './UI/Title/Title';
import { Checkbox } from 'antd';
import Spinner from './UI/Spinner/Spinner';
import { img } from '../assets/img/indexImg';


const StepThree = ({formikStepThree,prevStep,filePasportOne,imageFilePasportOne,setFilePasportOne,filePasportTwo,imageFilePasportTwo,setFilePasportTwo
    ,filePasportWidthMe,imageFilePasportWidthMe,setPasportWidthMe,isLoadingRegisterFull
}:any) => {
    return (
        <form onSubmit={formikStepThree.handleSubmit}>
            <Title text="Паспортные данные" typeClass="smallTitle" />

            <div className="block-input">
              <Input
                placeholder="№ паспорта"
                typeClass="formInput"
                value={formikStepThree.values.tin}
                id="tin"
                name="tin"
                onChange={formikStepThree.handleChange}
                onBlur={formikStepThree.handleBlur}
                type="text"
              />
              {formikStepThree.errors.tin && formikStepThree.touched.tin && (
                <div className="input__error">{formikStepThree.errors.tin}</div>
              )}
            </div>
            <div className="block-input">
              <Input
                placeholder="Дата выдачи"
                typeClass="formInput"
                value={formikStepThree.values.dateOfIssue}
                id="dateOfIssue"
                name="dateOfIssue"
                onChange={formikStepThree.handleChange}
                onBlur={formikStepThree.handleBlur}
                type="text"
              />
              {formikStepThree.errors.dateOfIssue &&
                formikStepThree.touched.dateOfIssue && (
                  <div className="input__error">
                    {formikStepThree.errors.dateOfIssue}
                  </div>
                )}
            </div>
            <div className="block-input">
              <Input
                placeholder="Орган выдавший документ"
                typeClass="formInput"
                value={formikStepThree.values.authority}
                id="authority"
                name="authority"
                onChange={formikStepThree.handleChange}
                onBlur={formikStepThree.handleBlur}
                type="text"
              />
              {formikStepThree.errors.authority &&
                formikStepThree.touched.authority && (
                  <div className="input__error">
                    {formikStepThree.errors.authority}
                  </div>
                )}
            </div>

            <p>Фото лицевой и задней сторон паспорта*</p>
            <div className="full-register__pasport__image">
              {filePasportOne ? (
                <>
                  <img
                    src={filePasportOne}
                    alt=""
                    className="full-register__pasport__image__avatar"
                    onClick={() => {
                      imageFilePasportOne.current.click();
                      console.log(filePasportOne);
                    }}
                  />
                  <input
                    type="file"
                    ref={imageFilePasportOne}
                    name="sidePassportPicture1"
                    id="sidePassportPicture1"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "sidePassportPicture1",
                        e.target.files[0]
                      );
                      setFilePasportOne(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {formikStepThree.errors.sidePassportPicture1 &&
                    formikStepThree.touched.sidePassportPicture1 && (
                      <div className="input__error file">
                        {formikStepThree.errors.sidePassportPicture1}
                      </div>
                    )}
                </>
              ) : (
                <div
                  className="full-register__pasport__image__card block-input"
                  onClick={() => {
                    imageFilePasportOne.current.click();
                    console.log(filePasportOne);
                  }}
                >
                  <input
                    type="file"
                    ref={imageFilePasportOne}
                    name="sidePassportPicture1"
                    id="sidePassportPicture1"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "sidePassportPicture1",
                        e.target.files[0]
                      );
                      setFilePasportOne(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <img src={img.imageIcon} alt="" />
                  {formikStepThree.errors.sidePassportPicture1 &&
                    formikStepThree.touched.sidePassportPicture1 && (
                      <div className="input__error file">
                        {formikStepThree.errors.sidePassportPicture1}
                      </div>
                    )}
                </div>
              )}

              {filePasportTwo ? (
                <>
                  <img
                    src={filePasportTwo}
                    alt=""
                    className="full-register__pasport__image__avatar"
                    onClick={() => {
                      imageFilePasportTwo.current.click();
                    }}
                  />
                  <input
                    type="file"
                    ref={imageFilePasportTwo}
                    name="sidePassportPicture2"
                    id="sidePassportPicture2"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "sidePassportPicture2",
                        e.target.files[0]
                      );
                      setFilePasportTwo(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {formikStepThree.errors.sidePassportPicture2 &&
                    formikStepThree.touched.sidePassportPicture2 && (
                      <div className="input__error file">
                        {formikStepThree.errors.sidePassportPicture2}
                      </div>
                    )}
                </>
              ) : (
                <div
                  className="full-register__pasport__image__card block-input"
                  onClick={() => {
                    imageFilePasportTwo.current.click();
                    console.log(filePasportOne);
                  }}
                >
                  <input
                    type="file"
                    ref={imageFilePasportTwo}
                    name="sidePassportPicture2"
                    id="sidePassportPicture2"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "sidePassportPicture2",
                        e.target.files[0]
                      );
                      setFilePasportTwo(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <img src={img.imageIcon} alt="" />
                  {formikStepThree.errors.sidePassportPicture2 &&
                    formikStepThree.touched.sidePassportPicture2 && (
                      <div className="input__error file">
                        {formikStepThree.errors.sidePassportPicture2}
                      </div>
                    )}
                </div>
              )}
            </div>
            <p>Фото пользователя с паспортом*</p>
            <div className="full-register__pasport__image">
              {filePasportWidthMe ? (
                <>
                  <img
                    src={filePasportWidthMe}
                    alt=""
                    className="full-register__pasport__image__avatar"
                    onClick={() => {
                      imageFilePasportWidthMe.current.click();
                    }}
                  />
                  <input
                    type="file"
                    ref={imageFilePasportWidthMe}
                    name="passportWithMe"
                    id="passportWithMe"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "passportWithMe",
                        e.target.files[0]
                      );
                      setPasportWidthMe(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {formikStepThree.errors.passportWithMe &&
                    formikStepThree.touched.passportWithMe && (
                      <div className="input__error file">
                        {formikStepThree.errors.passportWithMe}
                      </div>
                    )}
                </>
              ) : (
                <div
                  className="full-register__pasport__image__card block-input"
                  onClick={() => {
                    imageFilePasportWidthMe.current.click();
                    console.log(filePasportOne);
                  }}
                >
                  <input
                    type="file"
                    ref={imageFilePasportWidthMe}
                    name="passportWithMe"
                    id="passportWithMe"
                    onChange={(e:any) => {
                      formikStepThree.setFieldValue(
                        "passportWithMe",
                        e.target.files[0]
                      );
                      setPasportWidthMe(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <img src={img.imageIcon} alt="" />
                  {formikStepThree.errors.passportWithMe &&
                    formikStepThree.touched.passportWithMe && (
                      <div className="input__error file">
                        {formikStepThree.errors.passportWithMe}
                      </div>
                    )}
                </div>
              )}
            </div>
            <div className="registration-agreement block-input">
              <Checkbox
                name="termsOfUse"
                id="termsOfUse"
                // checked={termsOfUseIsChecked}
                onChange={formikStepThree.handleChange}
                checked={formikStepThree.values.termsOfUse}
                value={formikStepThree.values.termsOfUse}
              />
              <label htmlFor="termsOfUse">
                Регистрируясь, вы принимаете Пользовательское соглашение,
                Конфиденциальность и Договор-оферта на rentit.kg
              </label>
              {formikStepThree.errors.termsOfUse &&
                formikStepThree.touched.termsOfUse && (
                  <div className="input__error file">
                    {formikStepThree.errors.termsOfUse}
                  </div>
                )}
            </div>
            <div className="full-register__handler">
              <button className="full-register__prev" onClick={prevStep}>
                Назад
              </button>
              <button className="button base-button margin__none" type="submit">
                {isLoadingRegisterFull ? (
                  <Spinner color={"white"} />
                ) : (
                  "Регистрация"
                )}
              </button>
            </div>
          </form>
    );
};

export default StepThree;