import { Container } from "./CreateUploadHeaderDetailModal.styled";
import { useEffect, useReducer } from "react";
import UploadHeaderDetailFormFieldView from "./UploadHeaderDetailFormField.view";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import valueUtils from "../../../utils/valueUtils";

const CreateUploadHeaderDetailModalComponent = (props) => {
    const [uploadHeaderDetails, dispatchUploadHeaderDetails] = useReducer(uploadHeaderDetailsReducer, initialUploadHeaderDetails);

    useEffect(() => {
        if (!props.createUploadHeaderDetailState || !props.createUploadHeaderDetailState?.uploadHeaderDetail?.details) {
            return;
        }

        dispatchUploadHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.createUploadHeaderDetailState?.uploadHeaderDetail?.details)
        })

    }, [props.createUploadHeaderDetailState]);

    const __uploadHeaderDetails = {
        action: {
            addCell: () => {
                let newDetail = {
                    id: uuidv4(),
                    colData: '',
                    cellType: 'String'
                }

                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                targetUploadHeaderDetails.push(newDetail);
                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
                })
            },
            deleteCell: (detailId) => {
                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                targetUploadHeaderDetails = targetUploadHeaderDetails.filter(r => r.id !== detailId);

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
                })
            }
        },
        change: {
            valueOfNameWithDetailId: (e, detailId) => {
                let name = e.target.name;
                let value = e.target.value;

                let targetUploadHeaderDetails = uploadHeaderDetails.map(r => {
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

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
                })
            },
            order: (result) => {
                if (!result.destination) return;

                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                const newDetails = valueUtils.reorder(
                    targetUploadHeaderDetails,
                    result.source.index,
                    result.destination.index
                );

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                props.onActionStoreUploadHeaderForm(e, uploadHeaderDetails)
            }
        }
    }

    if (!uploadHeaderDetails) {
        return null;
    }

    return (
        <Container>
            <UploadHeaderDetailFormFieldView
                uploadHeaderDetails={uploadHeaderDetails}

                onChangeValueOfNameWithDetailId={__uploadHeaderDetails.change.valueOfNameWithDetailId}
                onActionAddCell={__uploadHeaderDetails.action.addCell}
                onActionDeleteCell={__uploadHeaderDetails.action.deleteCell}
                onChangeOrder={__uploadHeaderDetails.change.order}
                onActionStoreUploadHeaderForm={__uploadHeaderDetails.submit.confirm}
            ></UploadHeaderDetailFormFieldView>
        </Container>
    )
}

export default CreateUploadHeaderDetailModalComponent;

const initialUploadHeaderDetails = null;

const uploadHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialUploadHeaderDetails;
    }
}
