import React from 'react';
import Input from './UI/Input/Input';
import Title from './UI/Title/Title';
import { Checkbox } from 'antd';

const StepTwo = ({formikStepTwoResidenceAddress,formikStepTwo,toggleChecked,checked,onChange,prevStep}:any) => {
    return (
        <form
            onSubmit={(e) => {
              e.preventDefault();
              formikStepTwoResidenceAddress.handleSubmit();
            }}
          >
            <Title text="Место проживания" typeClass="smallTitle" />
            <Title
              text="Адрес по прописке"
              typeClass="smallTitle"
              size="20px"
            />
            <div className="full-register__adress">
              <div className="full-register__adress__right">
                <div className="block-input">
                  <Input
                    placeholder="Область"
                    typeClass="formInput"
                    value={formikStepTwo.values.region}
                    id="region"
                    name="region"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="text"
                  />
                  {formikStepTwo.errors.region &&
                    formikStepTwo.touched.region && (
                      <div className="input__error">
                        {formikStepTwo.errors.region}
                      </div>
                    )}
                </div>

                <div className="block-input">
                  <Input
                    placeholder="Район"
                    typeClass="formInput"
                    value={formikStepTwo.values.district}
                    id="district"
                    name="district"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="text"
                  />
                  {formikStepTwo.errors.district &&
                    formikStepTwo.touched.district && (
                      <div className="input__error">
                        {formikStepTwo.errors.district}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="№ дома"
                    typeClass="formInput"
                    value={formikStepTwo.values.houseNumber}
                    id="houseNumber"
                    name="houseNumber"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="number"
                  />
                  {formikStepTwo.errors.houseNumber &&
                    formikStepTwo.touched.houseNumber && (
                      <div className="input__error">
                        {formikStepTwo.errors.houseNumber}
                      </div>
                    )}
                </div>
              </div>
              <div className="full-register__adress__left">
                <div className="block-input">
                  <Input
                    placeholder="Город/ село"
                    typeClass="formInput"
                    value={formikStepTwo.values.cityOrVillage}
                    id="cityOrVillage"
                    name="cityOrVillage"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="text"
                  />
                  {formikStepTwo.errors.cityOrVillage &&
                    formikStepTwo.touched.cityOrVillage && (
                      <div className="input__error">
                        {formikStepTwo.errors.cityOrVillage}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="Улица"
                    typeClass="formInput"
                    value={formikStepTwo.values.street}
                    id="street"
                    name="street"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="text"
                  />
                  {formikStepTwo.errors.street &&
                    formikStepTwo.touched.street && (
                      <div className="input__error">
                        {formikStepTwo.errors.street}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="№ квартиры"
                    typeClass="formInput"
                    value={formikStepTwo.values.apartmentNumber}
                    id="apartmentNumber"
                    name="apartmentNumber"
                    onChange={formikStepTwo.handleChange}
                    onBlur={formikStepTwo.handleBlur}
                    type="number"
                  />
                  {formikStepTwo.errors.apartmentNumber &&
                    formikStepTwo.touched.apartmentNumber && (
                      <div className="input__error">
                        {formikStepTwo.errors.apartmentNumber}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <Title
              text="Адрес по месту проживания"
              typeClass="smallTitle"
              size="20px"
            />
            <div className="full-register__adress__matches">
              <Checkbox checked={checked} onChange={onChange} />
              <label onClick={toggleChecked}>
                Совпадает с адресом по прописке
              </label>
            </div>
            <div className="full-register__adress">
              <div className="full-register__adress__right">
                <div className="block-input">
                  <Input
                    placeholder="Область"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.region}
                    id="region"
                    name="region"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="text"
                  />
                  {formikStepTwoResidenceAddress.errors.region &&
                    formikStepTwoResidenceAddress.touched.region && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.region}
                      </div>
                    )}
                </div>

                <div className="block-input">
                  <Input
                    placeholder="Район"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.district}
                    id="district"
                    name="district"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="text"
                  />
                  {formikStepTwoResidenceAddress.errors.district &&
                    formikStepTwoResidenceAddress.touched.district && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.district}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="№ дома"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.houseNumber}
                    id="houseNumber"
                    name="houseNumber"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="number"
                  />
                  {formikStepTwoResidenceAddress.errors.houseNumber &&
                    formikStepTwoResidenceAddress.touched.houseNumber && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.houseNumber}
                      </div>
                    )}
                </div>
              </div>
              <div className="full-register__adress__left">
                <div className="block-input">
                  <Input
                    placeholder="Город/ село"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.cityOrVillage}
                    id="cityOrVillage"
                    name="cityOrVillage"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="text"
                  />
                  {formikStepTwoResidenceAddress.errors.cityOrVillage &&
                    formikStepTwoResidenceAddress.touched.cityOrVillage && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.cityOrVillage}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="Улица"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.street}
                    id="street"
                    name="street"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="text"
                  />
                  {formikStepTwoResidenceAddress.errors.street &&
                    formikStepTwoResidenceAddress.touched.street && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.street}
                      </div>
                    )}
                </div>
                <div className="block-input">
                  <Input
                    placeholder="№ квартиры"
                    typeClass="formInput"
                    value={formikStepTwoResidenceAddress.values.apartmentNumber}
                    id="apartmentNumber"
                    name="apartmentNumber"
                    onChange={formikStepTwoResidenceAddress.handleChange}
                    onBlur={formikStepTwoResidenceAddress.handleBlur}
                    type="number"
                  />
                  {formikStepTwoResidenceAddress.errors.apartmentNumber &&
                    formikStepTwoResidenceAddress.touched.apartmentNumber && (
                      <div className="input__error">
                        {formikStepTwoResidenceAddress.errors.apartmentNumber}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="full-register__handler">
              <button className="full-register__prev" onClick={prevStep}>
                Назад
              </button>
              <button className="full-register__next" type="submit">
                Вперед
              </button>
            </div>
          </form>
    );
};

export default StepTwo;