import { ImageFieldWrapper } from "./ProductSalesAnalysisModal.styled";

export default function ImageFieldView(props) {
    return (
        <ImageFieldWrapper>
            {props.prodDetailRankItem &&
                <div className="img-wrapper">
                    <div className="img-box">
                        {props.prodDetailRankItem.salesProdImageUrl ?
                            <img src={props.prodDetailRankItem.salesProdImageUrl} title={props.prodDetailRankItem.imageFileName} />
                            :
                            <img src='/images/icon/no-image.jpg' title='no-image' />
                        }
                    </div>
                </div>
            }
        </ImageFieldWrapper>
    )
}