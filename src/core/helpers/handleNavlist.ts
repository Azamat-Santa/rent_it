import { navList } from "../../consts/navListConst" 

export const handlerNavlist = (userRole:string)=>{    
    switch (userRole) {
      case 'USER':
        return navList.filter(el=> el.role === 'USER')
      case 'ADMIN':
        return navList.filter(el=>el.role !== 'TECH_SUPPORT')
      case 'TECH_SUPPORT':
        return navList.filter(el=>el.role !== 'ADMIN')
      default:
        return navList.filter(el=> el.role === 'USER')
    }
 }