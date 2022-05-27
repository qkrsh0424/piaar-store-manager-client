import { Container } from "./CreateDownloadHeaderDetailModal.styled";
import { useEffect, useReducer } from "react";
import DownloadHeaderDetailFormFieldView from "./DownloadHeaderDetailFormField.view";
import _ from 'lodash';
import valueUtils from "../../../utils/valueUtils";
import { v4 as uuidv4 } from 'uuid';

const CreateDownloadHeaderDetailModalComponent = (props) => {
    const [downloadHeaderDetails, dispatchDownloadHeaderDetails] = useReducer(downloadHeaderDetailsReducer, initialDownloadHeaderDetails);
    const [uploadHeaderDetails, dispatchUploadHeaderDetails] = useReducer(uploadHeaderDetailsReducer, initialUploadHeaderDetails);

    useEffect(() => {
        if (!props.updateDownloadHeaderForm || !props.updateDownloadHeaderForm?.downloadHeaderDetail?.details) {
            return;
        }

        dispatchDownloadHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.updateDownloadHeaderForm?.downloadHeaderDetail?.details)
        });

        dispatchUploadHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.updateDownloadHeaderForm?.uploadHeaderDetail?.details)
        })
    }, [props.updateDownloadHeaderForm])

    const __downloadHeaderDetails = {
        action: {
            addCell: () => {
                let newDetail = {
                    id: uuidv4(),
                    headerName: '',
                    targetCellNumber: -1,
                    fixedValue: '',
                    uploadHeaderId: null
                }

                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails.push(newDetail);

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                });
            },
            deleteCell: (detailId) => {
                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails = targetHeaderDetails.filter(r => r.id !== detailId);

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                })
            }
        },
        change: {
            valueOfNameWithDetailId: (e, detailId) => {
                let name = e.target.name;
                let value = e.target.value;

                let targetDownloadHeaderDetails = downloadHeaderDetails.map(r => {
                    if (r.id === detailId) {
                        return {
                            ...r,
                            [name]: value
                        }
                    } else {
                        return {
                            ...r
                        }
                    }
                });

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetDownloadHeaderDetails
                })
            },
            order: (result) => {
                if (!result.destination) return;

                let targetHeaderDetails = [...downloadHeaderDetails];

                const newDetails = valueUtils.reorder(
                    targetHeaderDetails,
                    result.source.index,
                    result.destination.index
                );

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
            },
            fixedValueUsage: (e, detailId) => {
                let checked = e.target.checked;

                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails = targetHeaderDetails.map(r => {
                    if (r.id === detailId) {
                        if (checked) {
                            return {
                                ...r,
                                targetCellNumber: parseInt(-1)
                            }
                        } else {
                            return {
                                ...r,
                                targetCellNumber: 0,
                                fixedValue: ''
                            }
                        }
                    } else {
                        return {
                            ...r
                        }
                    }
                })

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                props.onActionStoreDownloadHeaderForm(downloadHeaderDetails);
            }
        }
    }

    if (!downloadHeaderDetails) {
        return null;
    }

    return (
        <Container>
            <DownloadHeaderDetailFormFieldView
                downloadHeaderDetails={downloadHeaderDetails}
                uploadHeaderDetails={uploadHeaderDetails}

                onChangeValueOfNameWithDetailId={__downloadHeaderDetails.change.valueOfNameWithDetailId}
                onChangeFixedValueUsage={__downloadHeaderDetails.change.fixedValueUsage}
                onChangeOrder={__downloadHeaderDetails.change.order}
                onActionAddCell={__downloadHeaderDetails.action.addCell}
                onActionDeleteCell={__downloadHeaderDetails.action.deleteCell}
                onActionStoreDownloadHeaderForm={__downloadHeaderDetails.submit.confirm}
            ></DownloadHeaderDetailFormFieldView>
        </Container>
    )
}

export default CreateDownloadHeaderDetailModalComponent;

const initialDownloadHeaderDetails = null;
const initialUploadHeaderDetails = null;

const downloadHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialDownloadHeaderDetails;
    }
}

const uploadHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialUploadHeaderDetails;
    }
}