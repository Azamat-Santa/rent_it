import './title.scss'


interface ITitleProps {
    text:string;
    typeClass?:string;
    size?: string ;
    margin?: string;
    color?:string;
    textAlign?:'center';
}


interface ITitleTypes {
    productDescTitle:string;
    productPriceTitle:string;
    smallTitle:string;
    [key: string]: string;
}


const Title = ({text, typeClass='',size,margin,color,textAlign}:ITitleProps) => {

    const titleTypes : ITitleTypes = {
        productDescTitle:'product-desc-title',
        productPriceTitle:'product-price-title',
        smallTitle:'small-title'
    }

    return (
        <div className={`title ${titleTypes[typeClass]}` } style={{fontSize:size,marginBottom:margin,color:color,textAlign:textAlign}}>
            {text}
        </div>
    );
};

export default Title;