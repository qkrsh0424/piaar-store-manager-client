import { ImageSelectorWrapper } from "./ModifyProductModal.styled";

export default function ImageSelectorFieldView(props) {
    return (
        <ImageSelectorWrapper>
            <div className="group-title">상품 이미지</div>
            <div className="input-box">
                <div className="image-delete-box">
                    <input type="file" accept="image/*"
                        id="mp_image_uploader"
                        onClick={(e) => e.target.value=''}
                        onChange={(e) => props.onActionUploadProductImageFile(e)}
                    />
                    {props.modifyProductData.imageUrl ?
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary delete-btn"
                                type="button"
                                onClick={() => props.onActionDeleteProductImageFile()}
                            >
                                삭제</button>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className="image-wrapper">
                    <div className="image-box">
                        {props.modifyProductData.imageUrl ?
                            <img name='imageFile' type="file" src={props.modifyProductData.imageUrl} title={props.modifyProductData.imageFileName}
                                onClick={() => props.onActionClickProductImageButton()}
                            />
                            :
                            <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image'
                                onClick={() => props.onActionClickProductImageButton()}
                            />
                        }
                    </div>
                </div>
            </div>
        </ImageSelectorWrapper>
    )
}