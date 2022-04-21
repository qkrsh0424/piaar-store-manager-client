import { ImageSelectorWrapper } from "./CreateProductOptionModal.styled";

export default function ImageSelectorFieldView(props) {
    return (
        <ImageSelectorWrapper>
            <div className="input-box">
                <div className="image-delete-box">
                    <input type="file" accept="image/*"
                        id={`cpom_i_uploader`}
                        onClick={(e) => e.target.value=''}
                        onChange={(e) => props.onActionUploadProductImageFile(e)}
                    />
                    {props.createOption.imageUrl ?
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
                        {props.createOption.imageUrl ?
                            <img name='imageFile' type="file" src={props.createOption.imageUrl} title={props.createOption.imageFileName}
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