import { useState, FC } from 'react';

import { category } from "../../core/api/categories";
import Title from "../UI/Title/Title";
import "./category.scss";
import { img } from "../../assets/img/indexImg";
import Spinner from "../UI/Spinner/Spinner";
import { ICategory } from '../../core/types/ICategory';

const Category : FC = () => {
  const [currentCategoryLoading,setCurrentCategoryLoading] = useState(0)
  const { data } = category.useGetCategoryByIdQuery("");
  const [deleteCategory,{isLoading:deleteIsloading}] = category.useDeleteCategoryMutation()

  return (
    <div className="category">
      <div className="category__title">
        <Title text="Название" size="25px" margin="0px" />
        <div></div>
      </div>
      {data ?
        data.map((category: ICategory) => (
          <div className="category__item">
            <div className="category__item__left">{category.name}</div>
            <div className="category__item__right">
                <img src={img.editIcon} alt="" />
                {deleteIsloading && currentCategoryLoading === category.categoryId ? 
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
        )) : <Spinner color={'blue'} />
    }
    </div>
  );
};

export default Category;
