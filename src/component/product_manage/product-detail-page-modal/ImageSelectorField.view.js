import { ImageSelectorWrapper } from "./ProductDetailPageModal.styled";

export default function ImageSelectorFieldView(props) {
    return (
        <ImageSelectorWrapper>
            <div className="image-box">
                <div>
                    <input type="file" accept="image/*"
                        id={`pdpm_i_uploader`}
                        onClick={(e) => e.target.value=''}
                        onChange={(e) => props.onActionUploadDetailPage(e)}
                    />
                </div>
                <div className="image-wrapper">
                    <div className="image-box">
                        {props.detailPage.imageUrl ?
                            <img name='imageFile' type="file" src={props.detailPage.imageUrl} title={props.detailPage.imageFileName}
                                onClick={() => props.onActionClickImageButton()}
                            />
                            :
                            <img name='imageFile' className='no-image' src='/images/icon/no-image.jpg' title='no-image'
                                onClick={() => props.onActionClickImageButton()}
                            />
                        }
                    </div>
                </div>
            </div>
        </ImageSelectorWrapper>
    )
}