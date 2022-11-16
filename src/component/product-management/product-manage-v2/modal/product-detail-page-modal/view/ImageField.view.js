import { useRef } from "react";
import { ImageControlFieldWrapper, ImageFieldWrapper } from "../ProductDetailPageModal.styled";

export default function ImageFieldView (props) {
    const imageUploaderRef = useRef();

    const onActionOpenImageUploader = () => {
        imageUploaderRef.current.click();
    }

    return (
        <ImageFieldWrapper>
            <div className='image-box'>
                <input
                    type='file'
                    accept='image/*'
                    ref={imageUploaderRef}
                    onClick={(e) => e.target.value = ''}
                    onChange={(e) => props.onActionUploadDetailPageImage(e)}
                />
            </div>

            {props.selectedDetailPage.imageUrl ?
                <>
                    <div className='image-wrapper'>
                        <div style={{ overflow: 'auto' }}>
                            <img name='imageFile' type="file" src={props.selectedDetailPage.imageUrl} title={props.selectedDetailPage.imageFileName} />
                        </div>
                    </div>
                    <ImageControlField
                        imageUrl={props.selectedDetailPage.imageUrl}
                        imageFileName={props.selectedDetailPage.imageFileName}
                        onActionOpen={onActionOpenImageUploader}
                        onActionRemove={props.onActionRemoveImageOfSelectedDetailPage}
                    />
                </>
                :
                <div className='image-wrapper'>
                    <img name='imageFile' src='/images/icon/no-image.jpg' title='no-image' style={{ cursor: 'pointer' }}
                        onClick={() => onActionOpenImageUploader()}
                    />
                </div>
            }
        </ImageFieldWrapper>
    )
}

function ImageControlField({ onActionOpen, onActionRemove }) {
    return (
        <ImageControlFieldWrapper>
            <div className='image-control-box'>
                <button
                    type='button'
                    className='button-el'
                    style={{ borderRadius: '0 0 0 4px' }}
                    onClick={() => onActionOpen()}
                >
                    <img
                        src='/assets/icon/replay_icon.png'
                        style={{ width: '35px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
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
                        style={{ width: '35px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
            </div>
        </ImageControlFieldWrapper>
    )
}