import Input from '../UI/Input/Input';
import './searchBlock.scss'
import { img } from '../../assets/img/indexImg';


const SearchBlock = ({setSearchAd,searchAd}:any) => {
    return (
        <div className="main__input__search">
          <Input typeClass="searchMainInput" placeholder='Поиск' value={searchAd} onChange={(e:any)=>setSearchAd(e.target.value)} />
          <img src={img.searchIcon} alt="" className="main__input__search__icon" />
        </div>
    );
};

export default SearchBlock;