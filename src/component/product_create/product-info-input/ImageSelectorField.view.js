import { ImageSelectorWrapper } from "./ProductInfoInput.styled";

export default function ImageSelectorFieldView(props) {
    return (
        <ImageSelectorWrapper>
            <div className="group-title">상품 이미지</div>
            <div className="input-box">
                <div className="image-delete-box">
                    <input type="file" accept="image/*"
                        id={`i_pm_cb_uploader`}
                        onClick={(e) => e.target.value=''}
                        onChange={(e) => props.onActionUploadProdImageFile(e)}
                    />
                    {props.productData.imageUrl ?
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary delete-btn"
                                type="button"
                                onClick={() => props.onActionDeleteImageFile()}
                            >
                                삭제</button>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className="image-wrapper">
                    <div className="image-box">
                        {props.productData.imageUrl ?
                            <img name='imageFile' type="file" src={props.productData.imageUrl} title={props.productData.imageFileName}
                                onClick={() => props.onActionClickImageButton()}
                            />
                            :
                            <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image'
                                onClick={() => props.onActionClickImageButton()}
                            />
                        }
                    </div>
                </div>
            </div>
        </ImageSelectorWrapper>
    )
}