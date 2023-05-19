import { img } from '../assets/img/indexImg'

export interface IDataMainPage {
    id: number;
    favorite: boolean;
    mainImageUrl: any;
    title: string;
    price: string;
}
export const dataViewPage = [
    {
        id:1,
        favorite:false,
        mainImageUrl:img.exImg2,
        title:'Stern Rocket 20"',
        price:'550 сом/ день'
    },
    {
        id:2,
        favorite:false,
        mainImageUrl:img.exImg4,
        title:'BMW 320i Sedan',
        price:'1300 сом/ день'
    },
    {
        id:3,
        favorite:false,
        mainImageUrl:img.exImg3,
        title:'Stern Rocket 20"',
        price:'550 сом/ день'
    },
    {
        id:4,
        favorite:false,
        mainImageUrl:img.exImg2,
        title:'Bosch GKS 235 Turbo',
        price:'500 сом/ день'
    },
    {
        id:5,
        favorite:false,
        mainImageUrl:img.exImg4,
        title:'BMW 320i Sedan',
        price:'1300 сом/ день'
    },
]