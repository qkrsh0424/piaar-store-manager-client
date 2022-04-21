import { ItemInfoWrapper } from "./DetailTable.styled";

export default function ProductInfoTableFieldView(props) {
    return (
        <ItemInfoWrapper>
            <div className="group-title">상품</div>
            {props.selectedProduct &&
                <div className="grid-container">
                    <div className="image-wrapper">
                        <div className="image-box">
                            {props.selectedProduct.imageUrl ?
                                <img src={props.selectedProduct.imageUrl} title={props.selectedProduct.imageFileName} />
                                :
                                <img src='/images/icon/no-image.jpg' title='no-image' />
                            }
                        </div>
                    </div>
                    <div className="info-grid-box">
                        <div className="grid-span-2">
                            <span>상품명 :</span>
                            <span className="info-text">{props.selectedProduct.defaultName}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>관리 상품명 :</span>
                            <span className="info-text">{props.selectedProduct.managementName}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>상품코드 :</span>
                            <span className="info-text">{props.selectedProduct.code}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>제조번호 :</span>
                            <span className="info-text">{props.selectedProduct.manufacturingCode}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>네이버 상품코드 :</span>
                            <span className="info-text">{props.selectedProduct.naverProductCode}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>HS_CODE :</span>
                            <span className="info-text">{props.selectedProduct.hsCode}</span>
                        </div>
                        <div className="grid-span-3">
                            <span>STYLE :</span>
                            <span className="info-text">{props.selectedProduct.style}</span>
                        </div>
                        <div className="grid-span-3">
                            <span>관세율 :</span>
                            <span className="info-text">{props.selectedProduct.tariffRate}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>가로(cm) :</span>
                            <span className="info-text">{props.selectedProduct.defaultWidth}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>세로(cm) :</span>
                            <span className="info-text">{props.selectedProduct.defaultLength}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>높이(cm) :</span>
                            <span className="info-text">{props.selectedProduct.defaultHeight}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>내품수량(ea) :</span>
                            <span className="info-text">{props.selectedProduct.defaultQuantity}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>무게(kg) :</span>
                            <span className="info-text">{props.selectedProduct.defaultWeight}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>재고관리여부 :</span>
                            <span className="info-text">{props.selectedProduct.stockManagement ? "O" : "X"}</span>
                        </div>
                        <div className="grid-span-6">
                            <span>메모 :</span>
                            <span className="info-text">{props.selectedProduct.memo}</span>
                        </div>
                    </div>
                </div>
            }
        </ItemInfoWrapper>
    )
}