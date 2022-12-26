import { category } from "../../../core/api/categories";
import Title from "../../../component/UI/Title/Title";
import "./category.scss";
import Spinner from "../../../component/UI/Spinner/Spinner";
import { useState } from 'react';
import { img } from "../../../assets/img/indexImg";

const Category = () => {
  const [currentCategoryLoading,setCurrentCategoryLoading] = useState(0)
  const { data } = category.useGetCategoryByIdQuery("");
  const [deleteCategory,{data:deleteCategoryData,isLoading:deleteIsloading}] = category.useDeleteCategoryMutation()
  console.log(data, "category");

  return (
    <div className="category">
      <div className="category__title">
        <Title text="Название" size="25px" margin="0px" />
        <div></div>
      </div>
      {data ?
        data.map((category: any) => (
          <div className="category__item">
            <div className="category__item__left">{category.name}</div>
            <div className="category__item__right">
                <img src={img.editIcon} alt="" />
                {deleteIsloading && currentCategoryLoading === category.categoryId? 
                <Spinner color={'blue'}/>:
                
                <img
                  src={img.deleteImg}
                  alt=""
                    onClick={() => {
                        setCurrentCategoryLoading(category.categoryId)
                        deleteCategory(category.categoryId)
                    }}
                />
                }
                
            </div>
          </div>
        )):<Spinner color={'blue'} />
    }
    </div>
  );
};

export default Category;
