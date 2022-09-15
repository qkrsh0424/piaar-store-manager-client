import { Container, HeaderFieldWrapper } from "./ProductDetailPageModal.styled";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SelectorFieldView from "./SelectorField.view";
import { useEffect, useReducer, useState } from "react";
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";
import InputFieldView from "./InputField.view";
import ImageSelectorFieldView from "./ImageSelectorField.view";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import { imageFileUploaderDataConnect } from "../../../data_connect/imageFileUploaderDataConnect";

function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">상품 상세페이지 설정</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}

// 상세페이지 최대 사이즈 12MB
const DETAIL_PAGE_MAX_SIZE = 12000000;

const ProductDetailPageModalComponent = (props) => {
    const [detailPage, dispatchDetailPage] = useReducer(detailPageReducer, initialDetailPage);
    const [isCreateData, setIsCreateData] = useState(false);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        __reqUploadImageFile: __reqUploadImageFile
    } = useImageFileUploaderHook();

    useEffect(() => {
        if(!props.selectedProduct) {
            return;
        }

        let pageId = props.selectedProduct.product.productDetailPageId;
        if(!pageId) {
            return;
        }

        if(!props.productDetailPageDataList) {
            return;
        }

        let data = props.productDetailPageDataList.filter(r => r.id === pageId)[0];

        dispatchDetailPage({
            type: 'INIT_DATA',
            payload: data
        })
    }, [props.selectedProduct, props.productDetailPageDataList])

    const onActionCreateProductDetailPage = (e) => {
        e.preventDefault();

        setIsCreateData(true);

        let data = {
            title: '',
            imageUrl: '',
            imageFileName: ''
        }

        dispatchDetailPage({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onChangeInputValue = (e) => {
        dispatchDetailPage({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionClickImageButton = () => {
        document.getElementById("pdpm_i_uploader").click();
    }

    const onActionUploadDetailPage = async (e) => {
        e.preventDefault();

        if(e.target.files.length === 0) return;

        if(e.target.files[0].size >= DETAIL_PAGE_MAX_SIZE) {
            alert('파일 사이즈 초과로 업로드할 수 없습니다.\n사이즈가 12MB 미만의 이미지를 업로드해주세요.');
            return;
        }

        onActionOpenBackdrop();
        let imageInfo = await __reqUploadImageFile(e);
        onActionCloseBackdrop();

        let productId = props.selectedProduct.product.id;

        let data = {
            ...detailPage,
            imageUrl: imageInfo.imageUrl,
            imageFileName: imageInfo.imageFileName,
            productId: productId
        };

        dispatchDetailPage({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onSubmitProductDetailPage = async (e) => {
        e.preventDefault();

        if(!detailPage.imageUrl || !detailPage.imageFileName) {
            alert('상세페이지 이미지는 필수항목입니다.');
            return;
        }

        if(!detailPage.title) {
            alert('상세페이지 이름은 필수항목입니다.');
            return;
        }

        // 새로 생성되는 데이터면 create 수정되는 데이터면 modify 함수 호출
        if(isCreateData) {
            await props.onSubmitCreateProductDetailPage(detailPage);
        }else {
            await props.onSubmitModifyProductDetailPage(detailPage);
        }

        dispatchDetailPage({
            type: 'CLEAR'
        });
        setIsCreateData(false);
    }

    const onChangeSelectedProductDetailPage = (e) => {
        e.preventDefault();
        
        let pageId = e.target.value;
        let data = props.productDetailPageDataList.filter(r => r.id === pageId)[0];

        dispatchDetailPage({
            type: 'INIT_DATA',
            payload: data
        })
        setIsCreateData(false);
    }

    const onActionDeleteProductDetailPage = async () => {
        if(!(detailPage && detailPage.id)) {
            alert('제거할 데이터를 선택해주세요.');
            return;
        }

        if(window.confirm("선택된 상세페이지를 제거하시겠습니까?")) {
            await props.onActionDeleteProductDetailPage(detailPage);
            
            dispatchDetailPage({
                type: 'CLEAR'
            })
        }
    }

    const onActionUpdateProductDetailPageOfSelectedProduct = async () => {
        if(window.confirm("대표 상세페이지를 변경하시겠습니까?")) {
            await props.onActionUpdateProductDetailPageOfSelectedProduct(detailPage);
            return;
        }
    }

    const onActionDownloadProductDetailPage = async () => {
        await imageFileUploaderDataConnect().downloadByUrl(detailPage.imageUrl, detailPage.title);
    }

    return (
        <>
            <Container>
                <HeaderFieldView
                    onClose={props.onActionCloseProductDetailPageModal}
                ></HeaderFieldView>
                <SelectorFieldView
                    detailPage={detailPage}
                    productDetailPageDataList={props.productDetailPageDataList}
                    isCreateData={isCreateData}
                    selectedProduct={props.selectedProduct}

                    onActionCreateProductDetailPage={onActionCreateProductDetailPage}
                    onChangeSelectedProductDetailPage={onChangeSelectedProductDetailPage}
                    onActionDeleteProductDetailPage={onActionDeleteProductDetailPage}
                    onActionUpdateProductDetailPageOfSelectedProduct={onActionUpdateProductDetailPageOfSelectedProduct}
                    onActionDownloadProductDetailPage={onActionDownloadProductDetailPage}
                ></SelectorFieldView>

                {detailPage &&
                    <form onSubmit={onSubmitProductDetailPage}>
                        <InputFieldView
                            detailPage={detailPage}
                            isCreateData={isCreateData}

                            onChangeInputValue={onChangeInputValue}
                        ></InputFieldView>
                        <ImageSelectorFieldView
                            detailPage={detailPage}

                            onActionClickImageButton={onActionClickImageButton}
                            onActionUploadDetailPage={onActionUploadDetailPage}
                        ></ImageSelectorFieldView>
                    </form>
                }
            </Container>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default ProductDetailPageModalComponent;

const initialDetailPage = null;

const detailPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialDetailPage;
        default: return initialDetailPage;
    }
}
