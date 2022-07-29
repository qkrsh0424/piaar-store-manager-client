import { Container, ImageFieldWrapper, TextInfoFieldWrapper } from "./ProductInfo.styled";

function ImageFieldView({ product }) {
    return (
        <ImageFieldWrapper>
            <div className='image-wrapper'>
                <div className='image-box'>
                    {product.imageUrl ?
                        <img src={product.imageUrl} title={product.imageFileName} />
                        :
                        <img src='/images/icon/no-image.jpg' title='no-image' />
                    }
                </div>
            </div>
        </ImageFieldWrapper>
    )
}

function TextInfoFieldView({ product, options }) {
    return (
        <TextInfoFieldWrapper>
            <div className='data-group'>
                <span>상품 코드 : </span>
                <span>{product.code}</span>
            </div>
            <div className='data-group'>
                <span>상품명 : </span>
                <span>{product.defaultName}</span>
            </div>
            <div className='data-group'>
                <span>상품관리명 : </span>
                <span>{product.managementName}</span>
            </div>
            <div className='data-group'>
                <span>옵션수량 : </span>
                <span>총 {options.length} 개</span>
            </div>
        </TextInfoFieldWrapper>
    )
}

const ProductInfoComponent = (props) => {
    return (
        <Container>
            <ImageFieldView
                product={props.selectedProduct.product}
            ></ImageFieldView>
            <TextInfoFieldView
                product={props.selectedProduct.product}
                options={props.selectedProduct.options}
            ></TextInfoFieldView>
        </Container>
    )
}

export default ProductInfoComponent;