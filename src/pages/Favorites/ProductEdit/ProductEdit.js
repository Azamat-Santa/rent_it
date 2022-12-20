import React from 'react';
import './productEdit.scss'
import vel from '../../../assets/img/vel.png'
import vel1 from '../../../assets/img/vel1.png'
import vel2 from '../../../assets/img/vel2.png'
import InputEdit from '../../../component/InputEdit/InputEdit';
import EditTextArea from '../../../component/EditTextArea/EditTextArea';

const ProductEdit = () => {
   
    return (
        <div className='product-edit'>
            <div className="product-edit__imgs">
                <div className="product-edit__imgs__right">
                   <img src={vel} alt="" />
                </div>
                <div className="product-edit__imgs__left">
                    <img src={vel1} alt="" />
                    <img src={vel2} alt="" />
                    <div className='product-edit__imgs__add'>
                        
                    </div>
                </div>
            </div>
            <InputEdit 
              title='Название' 
              placeholder='Welt Floxy 1.0 V White'
            />
            <InputEdit 
              title='Категория' 
              placeholder='Велосипеды'
            />
            <InputEdit 
              title='Цена' 
              placeholder='350 сом'
            />
            <InputEdit 
              title='Город' 
              placeholder='Бишкек'
            />
             <EditTextArea
              title='Характеристики товара' 
              placeholder='Диаметр: 26, Вилка: Hagen ES-245 Alloy/Steel 60mm, Передний переключатель: Shimano TZ-500, Задний переключатель: MicroShift RD-M21, Тип тормозов: Ободные
                Рама: Alloy 6061, Количество скоростей: 21'
            />
              <EditTextArea
              title='Описание' 
              placeholder='Floxy 1.0 - женская модель начального уровня для прогулок. Хороша для нерегулярного использования на плоском рельефе в спокойном режиме езды. Относительно небольшой диаметр колеса делает этой велосипед универсальным для использования как взрослыми, так и подростками. '
            />
        </div>
    );
};

export default ProductEdit;