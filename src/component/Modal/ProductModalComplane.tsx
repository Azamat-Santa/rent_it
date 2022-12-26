import { useFormik } from 'formik';
import EditTextArea from '../UI/EditTextArea/EditTextArea';
import { validationComplaintsSchema } from '../../consts/validationSchema/validationSchemaProduct';
import { message, Modal } from 'antd';
import { complaintsApi } from '../../core/api/complaints';
import Spinner from '../UI/Spinner/Spinner';

const ProductModalComplane = ({ownerData,setIsComplaintsModal,isComplaintsModal}:any) => {
  const [addComplane , { data: addComplaneData, isLoading: isLoadingAddComplane }] = complaintsApi.useAddComplaintsMutation();

    const formikComplaints = useFormik({
        initialValues: {
          reason: "",
        },
        validationSchema: validationComplaintsSchema,
        onSubmit: (value) => {
          const option = {
            ...value,
            userId:ownerData.userId
          }
          addComplane(option).then((res:any)=>{
            if(res?.error?.originalStatus === 200){
              message.success('Жалоба успешно добавлено!!!')
              console.log(res,'succ');
              
            }
            if(res?.error?.data.statusCode === 400){
              message.error(res?.error?.data.errors[0])
              console.log(res,'error');
              
            }
            setIsComplaintsModal(false)
          }).catch(res=>{
            console.log(res,'err');
          })
        },
      });
    return (
        <Modal
              open={isComplaintsModal}
              onCancel={()=>setIsComplaintsModal(false)}
              footer={null}
              width="720px"
            >
              <form action=""
                onSubmit={formikComplaints.handleSubmit}
              >
              <EditTextArea
                value={formikComplaints.values.reason}
                onChange={formikComplaints.handleChange}
                onBlur={formikComplaints.handleBlur}
                name='reason'
                id="reason"
                placeholder="Напишите причину жалобы..."
                createInput
              />
              <button 
                className="button"
                type="submit"
              >{isLoadingAddComplane ? <Spinner color={'blue'}/>:'Отправить'}
              </button>
              </form>
              
            </Modal>
    );
};

export default ProductModalComplane;