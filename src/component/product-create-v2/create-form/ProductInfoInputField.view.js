import { useRef } from "react";
import RequiredIcon from "../../module/icon/RequiredIcon";
import { ProductInfoInputWrapper } from "./CreateForm.styled";

function ImageControlField({ imageUrl, imageFileName, onActionOpen, onActionRemove }) {
    return (
        <div>
            <img name='imageFile' type="file" src={imageUrl} title={imageFileName} />
            <div className='image-control-box'>
                <button
                    type='button'
                    className='button-el'
                    style={{ borderRadius: '0 0 0 4px' }}
                    onClick={() => onActionOpen()}
                >
                    <img
                        src='/assets/icon/replay_icon.png'
                        style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
                <button
                    type='button'
                    className='button-el'
                    style={{ borderRadius: '0 0 4px 0' }}
                    onClick={() => onActionRemove()}
                >
                    <img
                        src='/assets/icon/delete_icon.png'
                        style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
            </div>
        </div>
    )
}

export default function ProductInfoInputFieldView(props) {
    const productImageUploaderRef = useRef();

    const onActionOpenImageUploader = () => {
        productImageUploaderRef.current.click();
    }

    return (
        <ProductInfoInputWrapper>
            <div className='title-line' onClick={(e) => props.onActionSlideEffectControl(e, 'product')}>
                <div className="title-label">
                    <span>상품</span>
                    <RequiredIcon />
                </div>
                <div className='arrow-btn-box'>
                    <button
                        type='button'
                        className='button-el'
                        name='product'
                        onClick={(e) => props.onActionSlideEffectControl(e, 'product')}
                    >
                        <img
                            src={`/assets/icon/${props.slideDownEffect?.product ? 'up_arrow_black_icon.png' : 'down_arrow_black_icon.png'}`}
                            style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            alt=""
                            loading='lazy'
                        ></img>
                    </button>
                </div>
            </div>

            {props.slideDownEffect?.product &&
                <div className='inner-content'>
                    <div className='input-group-box'>
                        <span className='control-label'>
                            이미지
                        </span>
                        <div className="image-wrapper">
                            <div className="image-box">
                                <input type="file" accept="image/*"
                                    ref={productImageUploaderRef}
                                    onClick={(e) => e.target.value = ''}
                                    onChange={(e) => props.onActionUploadProductImageFile(e)}
                                />
                                {props.createProductData.imageUrl ?
                                    <ImageControlField
                                        imageUrl={props.createProductData.imageUrl}
                                        imageFileName={props.createProductData.imageFileName}
                                        onActionOpen={onActionOpenImageUploader}
                                        onActionRemove={props.onActionRemoveImage}
                                    />
                                    :
                                    <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image' style={{ cursor: 'pointer' }}
                                        onClick={() => onActionOpenImageUploader()}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='input-group-box'>
                        <span className='control-label'>
                            상품명
                            <RequiredIcon />
                        </span>
                        <input type='text' name='defaultName' value={props.createProductData.defaultName} onChange={(e) => props.onChangeProductInputValue(e)} />
                    </div>
                    <div className='input-group-box'>
                        <span className='control-label'>상품설명</span>
                        <input type='text' name='managementName' value={props.createProductData.managementName} onChange={(e) => props.onChangeProductInputValue(e)} />
                    </div>
                    <div className='input-group-box'>
                        <span className='control-label'>메모</span>
                        <input type='text' name='memo' value={props.createProductData.memo} onChange={(e) => props.onChangeProductInputValue(e)} />
                    </div>
                    <div className='input-group-box'>
                        <span className='control-label'>구매링크</span>
                        <input type='text' name='purchaseUrl' value={props.createProductData.purchaseUrl} onChange={(e) => props.onChangeProductInputValue(e)} />
                    </div>
                    <div className='input-group-box'>
                        <span className='control-label'>재고반영 여부 <RequiredIcon /></span>
                        <div className='flex-item toggle-btn-box'>
                            <div>
                                <button
                                    type='button'
                                    name='stockManagement'
                                    className={`button-el ${props.createProductData.stockManagement && 'btn-active'}`}
                                    onClick={(e) => props.onChangeProductStockManagement(e)}
                                >
                                    반영
                                </button>
                            </div>
                            <div>
                                <button
                                    type='button'
                                    name='stockManagement'
                                    className={`button-el ${!props.createProductData.stockManagement && 'btn-active'}`}
                                    onClick={(e) => props.onChangeProductStockManagement(e)}
                                >
                                    미반영
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </ProductInfoInputWrapper>
    )
}