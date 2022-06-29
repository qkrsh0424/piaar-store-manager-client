import { ImageFieldWrapper } from "./ProductStockAnalysisModal.styled";

export default function ImageFieldView(props) {
    return (
        <ImageFieldWrapper>
            {props.prodDetailRankItem &&
                <div className="img-wrapper">
                    <div className="img-box">
                        {props.prodDetailRankItem.product.imageUrl ?
                            <img src={props.prodDetailRankItem.product.imageUrl} title={props.prodDetailRankItem.product.imageFileName} />
                            :
                            <img src='/images/icon/no-image.jpg' title='no-image' />
                        }
                    </div>
                </div>
            }
        </ImageFieldWrapper>
    )
}