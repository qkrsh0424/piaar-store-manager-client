import { ImageFieldWrapper } from "./ReturnProductImageModal.styled";

export default function ImageFieldView(props) {
    return (
        <ImageFieldWrapper>
            {props.returnProductImageList?.map((r, idx) => {
                return (
                    <div
                        key={'return-product-img-idx' + idx}
                        className="image-wrapper"
                    >
                        <div className="image-box">
                            {r.imageUrl &&
                                <img name='imageFile' type="file" src={r.imageUrl} title={r.imageFileName}
                                    onClick={() => props.onActionRemoveReturnProductImageFile(r.id)}
                                />
                            }
                        </div>
                    </div>
                )
            })}
        </ImageFieldWrapper >
    );
}