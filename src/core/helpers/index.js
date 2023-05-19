
const formKeys = ['bookDateFrom','bookDateTill','categoryId','currency','description','fieldValue','locationX','locationY','minimumBookingNumberDay','price','title']


export const sortInitialState = (stateFormik) =>{
    const fieldValue = {
    }
    const result = {
    }

     Object.keys(stateFormik).map(key=>{
      if(key ==='fieldValue'){
        delete stateFormik[key]
      }})
      
     Object.keys(stateFormik).map(key=>{
      if(formKeys.includes(key)){
        fieldValue[key]=stateFormik[key]
      }
     })
     stateFormik.fieldValue = fieldValue
     Object.keys(stateFormik).map(key=>{
      if(formKeys.includes(key)){
        result[key]=stateFormik[key]
      }
     })
     return result
  }