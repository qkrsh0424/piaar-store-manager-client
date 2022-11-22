import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { useImageFileUploaderHook } from "../../../../../hooks/uploader/useImageFileUploaderHook";
import SubmitModalComponentV2 from "../../../../module/modal/SubmitModalComponentV2";
import useProductDetailPagesHook from "./hooks/useProductDetailPagesHook";
import ImageFieldView from "./view/ImageField.view";
import InputFieldView from "./view/InputField.view";
import SelectorFieldView from "./view/SelectorField.view";

// 상세페이지 최대 사이즈 12MB
const DETAIL_PAGE_MAX_SIZE = 12000000;

const ProductDetailPageModalComponent = (props) => {
    const {
        detailPages,
        selectedDetailPage,

        reqSearchBatchByProductId,
        onChangeSelectedData: onChangeSelectedDetailPage,
        onChangeImageInfoOfSelectedData: onChangeSelectedDetailPageImageInfo,
        onActionRemoveImageOfSelectedData: onActionRemoveImageOfSelectedDetailPage,
        onChangeValueOfName: onChangeDefaultPageValueOfName,
        onActionAddData: onActionAddDetailPage,
        reqCreateOne: reqCreateDetailPage,
        checkSaveForm: checkDetailPageSaveForm,
        reqDeleteOne: reqDeleteDetailPage,
        reqChangeOne: reqChangeDetailPage,
        onActionRemoveData: onActionRemoveDetailPage,
    } = useProductDetailPagesHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        __reqUploadImageFile,
        __reqDownloadImageFile
    } = useImageFileUploaderHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchBatchByProductId(props.product.id)
            onActionCloseBackdrop();

        }

        if(!props.product) {
            return;
        }

        fetchInit()
    }, [props.product])

    const __handle = {
        req: {
            downloadDetailPage: async (e) => {
                e.preventDefault();
                
                if(!(selectedDetailPage && selectedDetailPage.imageUrl)) {
                    alert('이미지를 다운로드할 수 없습니다.');
                    return;
                }

                onActionOpenBackdrop();

                let body = {
                    fileName: selectedDetailPage.imageFileName,
                    title: selectedDetailPage.title
                }
                await __reqDownloadImageFile(body);
                onActionCloseBackdrop();
            }
        },
        action: {
            uploadDetailPageImage: async (e) => {
                e.preventDefault();

                if(e.target.files.length === 0) return;

                if(e.target.files[0].size >= DETAIL_PAGE_MAX_SIZE) {
                    alert('[파일 사이즈 초과] 12KB 미만의 이미지를 업로드해주세요.')
                }

                onActionOpenBackdrop();
                let imageInfo = await __reqUploadImageFile(e);
                onActionCloseBackdrop();

                onChangeSelectedDetailPageImageInfo(imageInfo);
            },
            addDetailPage: (e) => {
                e.preventDefault();

                onActionAddDetailPage(props.product.id);
            }
        },
        submit: {
            createOrModifyDetailPage: async () => {
                try {
                    checkDetailPageSaveForm();

                    onActionOpenBackdrop();
                    // 기존 존재하는 데이터라면 수정, 아니라면 생성
                    if(detailPages.some(r => r.id === selectedDetailPage.id)) {
                        await reqChangeDetailPage(() => {
                            let snackbarSetting = {
                                message: '완료되었습니다.',
                                severity: 'info'
                            }
                            onActionOpenSnackbar(snackbarSetting);
                        });
                    }else {
                        await reqCreateDetailPage(() => {
                            let snackbarSetting = {
                                message: '완료되었습니다.',
                                severity: 'info'
                            }
                            onActionOpenSnackbar(snackbarSetting);
                        });
                    }
                    await reqSearchBatchByProductId(props.product.id);
                    onActionCloseBackdrop();
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                }
            },
            deleteDetailPage: async (e) => {
                e.preventDefault();
                
                // 기존에 존재하는 데이터 제거
                if (detailPages.some(r => r.id === selectedDetailPage.id)) {
                    if (!window.confirm('삭제하시겠습니까?')) {
                        return;
                    }
                    onActionOpenBackdrop();
                    await reqDeleteDetailPage(() => {
                        let snackbarSetting = {
                            message: '완료되었습니다.',
                            severity: 'info'
                        }
                        onActionOpenSnackbar(snackbarSetting);
                    });
                    await reqSearchBatchByProductId(props.product.id);
                    onActionCloseBackdrop();
                } else {
                    onActionRemoveDetailPage();
                }
            }
        }
    }

    return (
        <>
            <SubmitModalComponentV2
                open={true}
                title={'상세페이지 설정'}
                element={
                    <div className='data-wrapper'>
                        <SelectorFieldView
                            detailPages={detailPages}
                            product={props.product}
                            selectedDetailPage={selectedDetailPage}

                            onChangeSelectedDetailPage={onChangeSelectedDetailPage}
                            onActionAddDetailPage={__handle.action.addDetailPage}
                            onSubmitDeleteDetailPage={__handle.submit.deleteDetailPage}
                            onActionDownloadDetailPage={__handle.req.downloadDetailPage}
                        />

                        {selectedDetailPage &&
                            <>
                                <InputFieldView
                                    selectedDetailPage={selectedDetailPage}

                                    onChangeValueOfName={onChangeDefaultPageValueOfName}
                                />
                                <ImageFieldView
                                    selectedDetailPage={selectedDetailPage}

                                    onActionUploadDetailPageImage={__handle.action.uploadDetailPageImage}
                                    onActionRemoveImageOfSelectedDetailPage={onActionRemoveImageOfSelectedDetailPage}
                                />
                            </>
                        }
                    </div>
                }
                maxWidth={'sm'}

                _onSubmit={__handle.submit.createOrModifyDetailPage}
                onClose={props.onActionCloseModal}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }
        </>
    )
}

export default ProductDetailPageModalComponent;