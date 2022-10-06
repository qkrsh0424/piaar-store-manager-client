import { useRef } from "react";
import Ripple from "../../module/button/Ripple";
import RequiredIcon from "../../module/icon/RequiredIcon";
import { ProductInfoInputWrapper } from "./CreateForm.styled";

export default function ProductInfoInputFieldView(props) {
    const productImageUploaderRef = useRef();

    const onActionOpenImageUploader = () => {
        productImageUploaderRef.current.click();
    }

    return (
        <ProductInfoInputWrapper>
            <div className='title-wrapper' onClick={props.onActionSlideEffectControl}>
                <div className="title-box">
                    <span>상품</span>
                    <RequiredIcon />
                </div>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionSlideEffectControl}
                    >
                        {props.slideDownEffect?.product ?
                            <img
                                src='/assets/icon/up_arrow_black_icon.png'
                                style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                alt=""
                                loading='lazy'
                            ></img>
                            :
                            <img
                                src='/assets/icon/down_arrow_black_icon.png'
                                style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                alt=""
                                loading='lazy'
                            ></img>
                        }
                        <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
                    </button>
                </div>
            </div>

            <div className={`body-wrapper ${props.slideDownEffect?.product ? `slide-down` : `slide-up`}`}>
                <div className='inner-wrapper'>
                    <div className='input-group image-group'>
                        <span className='title-text'>
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
                                    <>
                                        <img name='imageFile' type="file" src={props.createProductData.imageUrl} title={props.createProductData.imageFileName} />
                                        <div className='image-control-box'>
                                            <button
                                                type='button'
                                                className='button-el'
                                                onClick={onActionOpenImageUploader}
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
                                                onClick={props.onActionRemoveImage}
                                            >
                                                <img
                                                    src='/assets/icon/delete_icon.png'
                                                    style={{ width: '35px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                                                    alt=""
                                                    loading='lazy'
                                                ></img>
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image' style={{ cursor: 'pointer'}}
                                        onClick={onActionOpenImageUploader}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>
                            상품명
                            <RequiredIcon />
                        </span>
                        <input type='text' name='defaultName' value={props.createProductData.defaultName} onChange={props.onChangeProductInputValue} />
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>상품설명</span>
                        <input type='text' name='managementName' value={props.createProductData.managementName} onChange={props.onChangeProductInputValue} />
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>메모</span>
                        <input type='text' name='memo' value={props.createProductData.memo} onChange={props.onChangeProductInputValue} />
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>구매링크</span>
                        <input type='text' name='purchaseUrl' value={props.createProductData.purchaseUrl} onChange={props.onChangeProductInputValue} />
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>관리번호</span>
                        <input type='text' name='managementNumber' value={props.createProductData.managementNumber} onChange={props.onChangeProductInputValue} />
                    </div>
                    <div className='input-group'>
                        <span className='title-text'>재고반영 여부 <RequiredIcon /></span>
                        <div className='stock-reflect-btn'>
                            <button
                                type='button'
                                className={`button-el ${props.createProductData.stockManagement && 'btn-active'}`}
                                onClick={props.onActionChangeStockManagement}
                            >
                                반영
                            </button>
                            <button
                                type='button'
                                className={`button-el ${!props.createProductData.stockManagement && 'btn-active'}`}
                                onClick={props.onActionChangeStockManagement}
                            >
                                미반영
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProductInfoInputWrapper>
    )
}