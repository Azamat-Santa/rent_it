import { useRef,useState } from "react";
import "./fullRegistration.scss";
import Title from "../../component/UI/Title/Title";
import { Checkbox, DatePicker, message } from "antd";
import { useFormik } from "formik";
import { authUser } from "../../core/api/userAuth";
import jwt_decode from "jwt-decode";
import stepIcon1 from "../../assets/img/fullRegStep1.png";
import stepIcon2 from "../../assets/img/fullRegStep2.png";
import stepIcon3 from "../../assets/img/fullRegStep3.png";
import { useNavigate } from "react-router-dom";
import {
  ValidationSchemaStepOne,
  ValidationSchemaStepThree,
  ValidationSchemaStepTwo,
  ValidationSchemaStepTwoResidenceAddress,
} from "../../consts/validationSchema/validationSchemaFullregistration";
import StepOne from "../../component/StepOne";
import StepTwo from "../../component/StepTwo";
import StepThree from "../../component/StepThree";
import { routeEndpoints } from "../../consts/routeEndpoints";

const FullRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [filePasportOne, setFilePasportOne] = useState();
  const [filePasportTwo, setFilePasportTwo] = useState();
  const [filePasportWidthMe, setPasportWidthMe] = useState();
  const [checked, setChecked] = useState(false);
  const imageFilePasportOne = useRef(null);
  const imageFilePasportTwo = useRef(null);
  const imageFilePasportWidthMe = useRef(null);
  const [fullRegister, { isLoading: isLoadingRegisterFull }] =
    authUser.useFullRegisterMutation();
  const userId = jwt_decode(localStorage.getItem("accessTocken")).user_id;
  const history = useNavigate();

  const formikStepOne = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
      middleName: "",
    },
    validationSchema: ValidationSchemaStepOne,
    onSubmit: (value) => {
      const data = { ...formData, ...value };
      setFormData(data);
      nextStep();
    },
  });

  const formikStepTwoResidenceAddress = useFormik({
    initialValues: {
      region: "",
      cityOrVillage: "",
      district: "",
      street: "",
      houseNumber: null,
      apartmentNumber: null,
    },
    validationSchema: ValidationSchemaStepTwoResidenceAddress,
    onSubmit: (value) => {
      const data = { ...formData, residenceAddress: { ...value } };
      setFormData(data);
      formikStepTwo.handleSubmit();
      nextStep();
    },
  });

  const formikStepTwo = useFormik({
    initialValues: {
      region: "",
      cityOrVillage: "",
      district: "",
      street: "",
      houseNumber: null,
      apartmentNumber: null,
    },
    validationSchema: ValidationSchemaStepTwo,
    onSubmit: (value) => {
      const data = { ...formData, registeredAddress: { ...value } };
      setFormData(data);
    },
  });

  const formikStepThree = useFormik({
    initialValues: {
      tin: "",
      dateOfIssue: "",
      authority: "",
      sidePassportPicture1: "",
      sidePassportPicture2: "",
      passportWithMe: "",
      termsOfUse: false,
    },
    validationSchema: ValidationSchemaStepThree,
    onSubmit: async (value) => {
      const {
        sidePassportPicture1,
        sidePassportPicture2,
        passportWithMe,
        termsOfUse,
        ...rest
      } = value;
      const data = { ...formData, id: userId, passportData: { ...rest } };
      const formDataFile = new FormData();
      formDataFile.append(`multipartFiles`, value.sidePassportPicture1);
      formDataFile.append(`multipartFiles`, value.sidePassportPicture2);
      formDataFile.append(`multipartFiles`, value.passportWithMe);
      formDataFile.append(
        "userCompleteRegisterDto",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      console.log(formData, "formdata");
      fullRegister(formDataFile).then((data) => {
        console.log(data);
        if (data?.error) {
          message.error(data?.error?.data?.errors[0], 3);
        }
        if (data?.data) {
          message.success("Вы успешно прошли полную регистрацию!!!", 3);
          history(routeEndpoints.productDatail);
        }
      });
    },
  });

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const toggleChecked = () => {
    setChecked(!checked);
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "region",
          formikStepTwo.values.region
        )
      : formikStepTwoResidenceAddress.setFieldValue("region", "");
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "cityOrVillage",
          formikStepTwo.values.cityOrVillage
        )
      : formikStepTwoResidenceAddress.setFieldValue("cityOrVillage", "");
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "district",
          formikStepTwo.values.district
        )
      : formikStepTwoResidenceAddress.setFieldValue("district", "");
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "street",
          formikStepTwo.values.street
        )
      : formikStepTwoResidenceAddress.setFieldValue("street", "");
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "houseNumber",
          formikStepTwo.values.houseNumber
        )
      : formikStepTwoResidenceAddress.setFieldValue("houseNumber", "");
    !checked
      ? formikStepTwoResidenceAddress.setFieldValue(
          "apartmentNumber",
          formikStepTwo.values.apartmentNumber
        )
      : formikStepTwoResidenceAddress.setFieldValue("apartmentNumber", "");
  };
  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <div className="full-register__wrapper">
      <div className={step === 1 ? "full-register step_1" : "full-register"}>
        <div className="full-register__title">
          <Title text="Полная регистрация" margin="0px" />
          <div>
            Полная регистрация позволит Вам забронировать товар на сайте, также
            опубликовать объявление о сдаче товара
          </div>
          <img
            src={step === 1 ? stepIcon1 : step === 2 ? stepIcon2 : stepIcon3}
            alt=""
          />
        </div>
        {step === 1 && <StepOne formikStepOne={formikStepOne} />}
        {step === 2 && (
          <StepTwo
            formikStepTwoResidenceAddress={formikStepTwoResidenceAddress}
            formikStepTwo={formikStepTwo}
            toggleChecked={toggleChecked}
            onChange={onChange}
            checked={checked}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <StepThree
            formikStepThree={formikStepThree}
            prevStep={prevStep}
            filePasportOne={filePasportOne}
            imageFilePasportOne={imageFilePasportOne}
            setFilePasportOne={setFilePasportOne}
            filePasportTwo={filePasportTwo}
            imageFilePasportTwo={imageFilePasportTwo}
            setFilePasportTwo={setFilePasportTwo}
            filePasportWidthMe={filePasportWidthMe}
            imageFilePasportWidthMe={imageFilePasportWidthMe}
            setPasportWidthMe={setPasportWidthMe}
            isLoadingRegisterFull={isLoadingRegisterFull}
          />
        )}
      </div>
    </div>
  );
};

export default FullRegistration;
