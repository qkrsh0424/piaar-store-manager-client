import { ItemInfoWrapper } from "./DetailTable.styled";

export default function OptionInfoTableFieldView(props) {
    return (
        <ItemInfoWrapper>
            <div className="group-title">옵션</div>
            {props.selectedOption &&
                <div className="grid-container">
                    <div className="image-wrapper">
                        <div className="image-box">
                            {props.selectedOption.imageUrl ?
                                <img src={props.selectedOption.imageUrl} title={props.selectedOption.imageFileName} />
                                :
                                <img src='/images/icon/no-image.jpg' title='no-image' />
                            }
                        </div>
                    </div>
                    <div className="info-grid-box">
                        <div className="grid-span-2">
                            <span>옵션명 :</span>
                            <span className="info-text">{props.selectedOption.defaultName}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>옵션설명 :</span>
                            <span className="info-text">{props.selectedOption.managementName}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>관리코드 :</span>
                            <span className="info-text">{props.selectedOption.code}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>노스노스 고유코드 :</span>
                            <span className="info-text">{props.selectedOption.nosUniqueCode}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>판매가 :</span>
                            <span className="into-text">{props.selectedOption.salesPrice}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>재고수량 :</span>
                            <span className="into-text">{props.selectedOption.stockSumUnit}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>색상 :</span>
                            <span className="into-text">{props.selectedOption.color}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>CNY :</span>
                            <span className="into-text">{props.selectedOption.unitCny}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>KRW :</span>
                            <span className="into-text">{props.selectedOption.unitKrw}</span>
                        </div>
                        <div className="grid-span-2">
                            <span>세트상품 :</span>
                            <span className="into-text">{props.selectedOption.packageYn === 'y' ? 'O' : 'X'}</span>
                        </div>
                        <div className="grid-span-4">
                            <span>현재상태 :</span>
                            <span className="into-text">{props.selectedOption.status}</span>
                        </div>
                        <div className="grid-span-6">
                            <span>비고 :</span>
                            <span className="into-text">{props.selectedOption.memo}</span>
                        </div>
                    </div>
                </div>
            }
        </ItemInfoWrapper>
    )
}