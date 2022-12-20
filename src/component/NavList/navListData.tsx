interface InavList {
    path:string;
    text:string;
}
export const navList : InavList[] = [
    {
        path:'/',
        text:'Главная'
    },
    {
        path:'/favorite/0',
        text:'Профиль'
    },
]

export const navListAdmin : InavList[] = [
    {
        path:'/',
        text:'Главная'
    },
    {
        path:'/favorite/0',
        text:'Профиль'
    },
    {
        path:'/admin',
        text:'Админ'
    },
]

export const navListTechSupport : InavList[] = [
    {
        path:'/',
        text:'Главная'
    },
    {
        path:'/favorite/0',
        text:'Профиль'
    },
    {
        path:'/techSupport',
        text:'Тех поддержка'
    },
]
