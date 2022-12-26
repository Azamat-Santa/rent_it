export interface InavList {
    path:string;
    text:string;
    role:string;
}
export const navList : InavList[] = [
    {
        path:'/',
        text:'Главная',
        role:"USER"
    },
    {
        path:'/favorite/0',
        text:'Профиль',
        role:"USER"
    },
    {
        path:'/admin',
        text:'Админ',
        role:"ADMIN"
    },
    {
        path:'/techSupport',
        text:'Тех поддержка',
        role:"TECH_SUPPORT"
    },
]


