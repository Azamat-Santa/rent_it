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
      if(key !== 'bookDateFrom' && key !== 'bookDateTill' && key !== 'categoryId' && key !==  'currency' && key !== 'description' && key !== 'fieldValue' && key !== 'locationX'&& key !== 'locationY' && key !== 'minimumBookingNumberDay' && key !== 'price' && key !== 'title'){
        fieldValue[key]=stateFormik[key]
      }
     })
    //  const arr = ['bookDateFrom', 'bookDateTill']
     stateFormik.fieldValue = fieldValue
     Object.keys(stateFormik).map(key=>{
      if(key === 'bookDateFrom' || key === 'bookDateTill' || key === 'categoryId' || key ===  'currency' || key === 'description' || key === 'fieldValue' || key === 'locationX' || key === 'locationY' || key === 'minimumBookingNumberDay' || key === 'price' || key === 'title'){
        result[key]=stateFormik[key]
      }
     })
     return result
  }