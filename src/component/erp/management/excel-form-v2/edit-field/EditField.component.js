import { Container, DownloadFormWrapper, Wrapper } from "./EditField.styled";
import { useEffect, useReducer, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import ViewDetailSelectModal from "./ViewDetailSelectModal.view";
import UpdateButtonFieldView from './UpdateButtonField.view';
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import HeaderFieldView from "./HeaderField.view";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import valueUtils from "../../../../../utils/valueUtils";
import SingleBlockButton from "../../../../module/button/SingleBlockButton";

const defaultHeaderDetails = getDefaultHeaderDetails();
const __ext_newHeaderDetail = {
    generate: () => {
        return {
            id: uuidv4(),
            customCellName: '헤더명',
            fieldType: '일반',
            fixedValue: '',
            mergeYn: 'n',
            mergeSplitter: '\n',
            valueSplitter: '-',
            viewDetails: [],
        }
    }
};
const splitters = ['\n', '\t', ' ', '-', '--', ',', ',,', '/', '//', '|', '||', '&', '&&', '|&&|', '$', '$$', '|$$|'];

export default function EditFieldComponent(props) {
    const [updateHeader, dispatchUpdateHeader] = useReducer(updateHeaderReducer, initialUpdateHeader);
    const [selectedHeaderDetail, dispatchSelectedHeaderDetail] = useReducer(selectedHeaderDetailReducer, initialSelectedHeaderDetail);
    const [addViewDetailModalOpen, setAddViewDetailModalOpen] = useState(false);
    const [mergeSplitterModalOpen, setMergeSplitterModalOpen] = useState(false);
    const [valueSplitterModalOpen, setValueSplitterModalOpen] = useState(false);
    const [changeFieldTypeModalOpen, setChangeFieldTypeModalOpen] = useState(false);
    const [deleteHeaderConfirmModalOpen, setDeleteHeaderConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (!props.selectedHeader) {
            return;
        }
        let header = _.cloneDeep(props.selectedHeader);

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        });

    }, [props.selectedHeader]);

    const __updateHeader = {
        submit: {
            deleteHeader: () => {
                props._onSubmit_deleteOne();
                __updateHeader.action.closeDeleteHeaderConfirmModal();
            },
            /**
             * header.headerDetail.details empty check
             * header.headerDetail.details.* 헤더명 empty check
             * 필드 타입이 일반일때 header.headerDetail.details.*.viewDetails empty check
             * 
             */
            updateHeader: () => {
                if (valueUtils.isEmptyValues(updateHeader.headerDetail.details)) {
                    alert('헤더를 추가해 주세요.');
                    return;
                }

                try {
                    updateHeader.headerDetail.details.forEach(headerDetail => {
                        if (valueUtils.isEmptyValues(headerDetail.customCellName)) {
                            throw new Error('헤더명은 필수 입력 값 입니다.');
                        }

                        if (headerDetail.fieldType === '일반' && valueUtils.isEmptyValues(headerDetail.viewDetails)) {
                            throw new Error('필드 타입이 일반인 경우 적어도 1개 이상의 필드값을 지정해야 합니다.');
                        }
                    });
                } catch (err) {
                    alert(err.message);
                    return;
                }
                props._onSubmit_updateOne(updateHeader);
            }
        },
        action: {
            addField: () => {
                let currHeader = _.cloneDeep(updateHeader);

                currHeader.headerDetail.details.push(__ext_newHeaderDetail.generate());

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: currHeader
                })
            },
            openAddViewDetailModal: (headerDetail) => {
                setAddViewDetailModalOpen(true);
                dispatchSelectedHeaderDetail({
                    type: 'SET_DATA',
                    payload: { ...headerDetail }
                })
            },
            closeAddViewDetailModal: () => {
                setAddViewDetailModalOpen(false);
                dispatchSelectedHeaderDetail({
                    type: 'CLEAR'
                })
            },
            openMergeSplitterModal: (headerDetail) => {
                setMergeSplitterModalOpen(true);
                dispatchSelectedHeaderDetail({
                    type: 'SET_DATA',
                    payload: { ...headerDetail }
                })
            },
            closeMergeSplitterModal: () => {
                setMergeSplitterModalOpen(false);
                dispatchSelectedHeaderDetail({
                    type: 'CLEAR'
                })
            },
            openValueSplitterModal: (headerDetail) => {
                setValueSplitterModalOpen(true);
                dispatchSelectedHeaderDetail({
                    type: 'SET_DATA',
                    payload: { ...headerDetail }
                })
            },
            closeValueSplitterModal: () => {
                setValueSplitterModalOpen(false);
                dispatchSelectedHeaderDetail({
                    type: 'CLEAR'
                })
            },
            openChangeFieldTypeModal: (headerDetail) => {
                setChangeFieldTypeModalOpen(true);
                dispatchSelectedHeaderDetail({
                    type: 'SET_DATA',
                    payload: { ...headerDetail }
                })
            },
            closeChangeFieldTypeModal: () => {
                setChangeFieldTypeModalOpen(false);
                dispatchSelectedHeaderDetail({
                    type: 'CLEAR'
                })
            },
            deleteHeaderDetail: (headerDetail) => {
                let targetDetails = [...updateHeader.headerDetail.details];

                let newDetails = targetDetails.filter(r => r.id !== headerDetail.id);

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: {
                        ...updateHeader,
                        headerDetail: {
                            ...updateHeader.headerDetail,
                            details: newDetails
                        }
                    }
                })
            },
            addViewDetails: () => {
                let details = [...updateHeader.headerDetail.details];
                let newHeaderDetail = { ...selectedHeaderDetail };

                details = details.map(r => {
                    if (r.id === newHeaderDetail.id) {
                        return newHeaderDetail
                    } else {
                        return r;
                    }
                })

                let header = {
                    ...updateHeader,
                    headerDetail: {
                        details: details
                    }
                }

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: header
                })

                __updateHeader.action.closeAddViewDetailModal();
            },
            openDeleteHeaderConfirmModal: () => {
                setDeleteHeaderConfirmModalOpen(true);
            },
            closeDeleteHeaderConfirmModal: () => {
                setDeleteHeaderConfirmModalOpen(false);
            }
        },
        change: {
            onChangeValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                let targetData = _.cloneDeep(updateHeader)
                let newUpdateHeader = _.set(targetData, name, value)
                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: newUpdateHeader
                })
            },
            detailsOrder: (result) => {
                if (!result.destination) {
                    return;
                }

                let targetUpdateHeader = _.cloneDeep(updateHeader);
                let targetDetails = targetUpdateHeader.headerDetail.details;

                const newDetails = valueUtils.reorder(
                    targetDetails,
                    result.source.index,
                    result.destination.index
                );

                targetUpdateHeader = {
                    ...targetUpdateHeader,
                    headerDetail: {
                        ...targetUpdateHeader.headerDetail,
                        details: newDetails
                    }
                }

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: targetUpdateHeader
                })
            }
        }
    }

    const __selectedHeaderDetail = {
        action: {
            selectColumn: (e) => {
                let viewDetails = [...selectedHeaderDetail.viewDetails];
                let name = e.target.name;
                let checked = e.target.checked;

                if (!checked) {
                    viewDetails = viewDetails.filter(r => r.matchedColumnName !== name);
                } else {
                    viewDetails.push({
                        matchedColumnName: name
                    })
                }

                dispatchSelectedHeaderDetail({
                    type: 'SET_DATA',
                    payload: {
                        ...selectedHeaderDetail,
                        viewDetails: [...viewDetails]
                    }
                })
            }
        },
        change: {
            valueOfNameWithClick: ({
                name,
                value
            }) => {
                let targetHeader = _.cloneDeep(updateHeader);
                let details = [...targetHeader.headerDetail.details];

                let newDetails = details.map(r => {
                    if (r.id === selectedHeaderDetail.id) {
                        return {
                            ...r,
                            [name]: value
                        }
                    } else {
                        return { ...r }
                    }
                });

                let newHeader = {
                    ...targetHeader,
                    headerDetail: {
                        ...targetHeader.headerDetail,
                        details: newDetails
                    }
                }

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: newHeader
                });
            },
            fieldType: (value) => {
                let targetHeader = _.cloneDeep(updateHeader);
                let details = [...targetHeader.headerDetail.details];

                let newDetails = details.map(r => {
                    if (r.id === selectedHeaderDetail.id) {
                        return {
                            ...r,
                            fieldType: value
                        }
                    } else {
                        return { ...r }
                    }
                });

                let newHeader = {
                    ...targetHeader,
                    headerDetail: {
                        ...targetHeader.headerDetail,
                        details: newDetails
                    }
                }

                dispatchUpdateHeader({
                    type: 'SET_DATA',
                    payload: newHeader
                });
            }
        }
    }
    return (
        <>
            {updateHeader &&
                <Layout>
                    <HeaderFieldView
                        onActionDeleteHeaderConfirmModalOpen={__updateHeader.action.openDeleteHeaderConfirmModal}
                    />
                    {/* Body */}
                    <DownloadFormView
                        updateHeader={updateHeader}
                        onActionAddField={__updateHeader.action.addField}
                        onChangeValueOfName={__updateHeader.change.onChangeValueOfName}
                        onChangeDetailsOrder={__updateHeader.change.detailsOrder}
                        onActionDeleteHeaderDetail={__updateHeader.action.deleteHeaderDetail}
                        onActionOpenAddViewDetailModal={__updateHeader.action.openAddViewDetailModal}
                        onActionOpenMergeSplitterModal={__updateHeader.action.openMergeSplitterModal}
                        onActionOpenChangeFieldTypeModal={__updateHeader.action.openChangeFieldTypeModal}
                        onActionOpenValueSplitterModal={__updateHeader.action.openValueSplitterModal}
                    />
                    <UpdateButtonFieldView
                        onSubmitUpdateHeader={__updateHeader.submit.updateHeader}
                    />
                </Layout>
            }

            {/* Modal */}
            {/* Setting View Details Modal */}
            {addViewDetailModalOpen && defaultHeaderDetails && selectedHeaderDetail &&
                <CommonModalComponent
                    open={addViewDetailModalOpen}
                    maxWidth={'lg'}
                    onClose={__updateHeader.action.closeAddViewDetailModal}
                >
                    <ViewDetailSelectModal
                        defaultHeaderList={defaultHeaderDetails}
                        selectedHeaderDetail={selectedHeaderDetail}
                        onActionSelectColumn={__selectedHeaderDetail.action.selectColumn}

                        onActionAddViewDetails={__updateHeader.action.addViewDetails}
                        onClose={__updateHeader.action.closeAddViewDetailModal}
                    ></ViewDetailSelectModal>
                </CommonModalComponent>
            }
            {/* Select Merge Splitter Modal */}
            {mergeSplitterModalOpen && selectedHeaderDetail &&
                <CommonModalComponent
                    open={mergeSplitterModalOpen}
                    onClose={__updateHeader.action.closeMergeSplitterModal}
                >
                    <SplitterModal
                        headerDetail={selectedHeaderDetail}
                        onChangeValueOfNameWithClick={__selectedHeaderDetail.change.valueOfNameWithClick}
                        name='mergeSplitter'
                        onClose={__updateHeader.action.closeMergeSplitterModal}
                    />
                </CommonModalComponent>
            }

            {/* Select Value Splitter Modal */}
            {valueSplitterModalOpen && selectedHeaderDetail &&
                <CommonModalComponent
                    open={valueSplitterModalOpen}
                    onClose={__updateHeader.action.closeValueSplitterModal}
                >
                    <SplitterModal
                        headerDetail={selectedHeaderDetail}
                        onChangeValueOfNameWithClick={__selectedHeaderDetail.change.valueOfNameWithClick}
                        name='valueSplitter'
                        onClose={__updateHeader.action.closeValueSplitterModal}
                    />
                </CommonModalComponent>
            }

            {/* Select Field Type Modal */}
            {changeFieldTypeModalOpen && selectedHeaderDetail &&
                <CommonModalComponent
                    open={changeFieldTypeModalOpen}
                    onClose={__updateHeader.action.closeChangeFieldTypeModal}
                >
                    <FieldTypeModal
                        selectedHeaderDetail={selectedHeaderDetail}
                        onChangeValueOfNameWithClick={__selectedHeaderDetail.change.valueOfNameWithClick}
                        onClose={__updateHeader.action.closeChangeFieldTypeModal}
                    />
                </CommonModalComponent>
            }

            {/* Delete Header Confirm Modal */}
            <ConfirmModalComponent
                open={deleteHeaderConfirmModalOpen}
                message={`정말로 해당 양식을 삭제 하시겠습니까?`}

                onConfirm={__updateHeader.submit.deleteHeader}
                onClose={__updateHeader.action.closeDeleteHeaderConfirmModal}
            ></ConfirmModalComponent>
        </>
    );
}

const initialUpdateHeader = null;
const initialSelectedHeaderDetail = null;

const updateHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return null;
    }
}

const selectedHeaderDetailReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

function Layout({ children }) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}

function Splitter({ splitter }) {
    switch (splitter) {
        case '\n':
            return (
                <img
                    src='/assets/icon/keyboard_return_icon.png'
                    width={15}
                    height={15}
                    alt='keyboard return icon'
                    loading="lazy"
                ></img>
            )
        case '\t':
            return (
                <img
                    src='/assets/icon/keyboard_tab_icon.png'
                    width={15}
                    height={15}
                    alt='keyboard tab icon'
                    loading="lazy"
                ></img>
            )
        case ' ':
            return (

                <img
                    src='/assets/icon/keyboard_space_icon.png'
                    width={15}
                    height={15}
                    alt='keyboard space icon'
                    loading="lazy"
                ></img>
            )
        default:
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 15 }}>
                    {splitter}
                </div>
            )
    }
}

function SplitterModal({
    headerDetail,
    onChangeValueOfNameWithClick,
    name,
    onClose
}) {

    return (
        <>
            <div style={{ padding: '10px' }}>
                {splitters.map(splitter => {
                    switch (splitter) {
                        case '\n':
                        case '\t':
                        case ' ':
                            return (
                                <SingleBlockButton
                                    type='button'
                                    onClick={() => {
                                        onChangeValueOfNameWithClick({ name: name, value: splitter });
                                        onClose();
                                    }}
                                    style={{
                                        background: headerDetail[name] === splitter && '#2c73d240',
                                        border: headerDetail[name] === splitter && '1px solid #2c73d240'
                                    }}
                                >
                                    {splitter === '\n' &&
                                        <>
                                            <img
                                                src='/assets/icon/keyboard_return_icon.png'
                                                width={25}
                                                height={25}
                                                alt='keyboard space icon'
                                                loading="lazy"
                                            ></img>
                                            <span>(줄바꿈)</span>
                                        </>
                                    }
                                    {splitter === '\t' &&
                                        <>
                                            <img
                                                src='/assets/icon/keyboard_tab_icon.png'
                                                width={25}
                                                height={25}
                                                alt='keyboard space icon'
                                                loading="lazy"
                                            ></img>
                                            <span>(들여쓰기)</span>
                                        </>
                                    }
                                    {splitter === ' ' &&
                                        <>
                                            <img
                                                src='/assets/icon/keyboard_space_icon.png'
                                                width={25}
                                                height={25}
                                                alt='keyboard space icon'
                                                loading="lazy"
                                            ></img>
                                            <span>(띄어쓰기)</span>
                                        </>
                                    }
                                </SingleBlockButton>
                            );
                        default:
                            return (
                                <SingleBlockButton
                                    type='button'
                                    onClick={() => {
                                        onChangeValueOfNameWithClick({ name: name, value: splitter });
                                        onClose();
                                    }}
                                    style={{
                                        background: headerDetail[name] === splitter && '#2c73d240',
                                        border: headerDetail[name] === splitter && '1px solid #2c73d240'
                                    }}
                                >
                                    <span>{splitter}</span>
                                </SingleBlockButton>
                            );
                    }
                })}
            </div>
        </>
    );
}

function FieldTypeModal({
    selectedHeaderDetail,
    onChangeValueOfNameWithClick,
    onClose
}) {
    return (
        <div style={{ padding: 10 }}>
            <SingleBlockButton
                type='button'
                style={{
                    background: selectedHeaderDetail.fieldType === '일반' && '#2c73d240',
                    border: selectedHeaderDetail.fieldType === '일반' && '1px solid #2c73d240'
                }}
                onClick={() => {
                    onChangeValueOfNameWithClick({ name: 'fieldType', value: '일반' });
                    onClose();
                }}
            >
                일반
            </SingleBlockButton>
            <SingleBlockButton
                type='button'
                style={{
                    background: selectedHeaderDetail.fieldType === '고정값' && '#2c73d240',
                    border: selectedHeaderDetail.fieldType === '고정값' && '1px solid #2c73d240'
                }}
                onClick={() => {
                    onChangeValueOfNameWithClick({ name: 'fieldType', value: '고정값' });
                    onClose();
                }}
            >
                고정값
            </SingleBlockButton>
            <SingleBlockButton
                type='button'
                style={{
                    background: selectedHeaderDetail.fieldType === '운송코드' && '#2c73d240',
                    border: selectedHeaderDetail.fieldType === '운송코드' && '1px solid #2c73d240'
                }}
                onClick={() => {
                    onChangeValueOfNameWithClick({ name: 'fieldType', value: '운송코드' });
                    onClose();
                }}
            >
                운송코드
            </SingleBlockButton>
        </div>
    );
}
function DownloadFormView({
    updateHeader,
    onActionAddField,
    onActionOpenAddViewDetailModal,
    onChangeValueOfName,
    onChangeDetailsOrder,
    onActionOpenMergeSplitterModal,
    onActionOpenValueSplitterModal,
    onActionOpenChangeFieldTypeModal,
    onActionDeleteHeaderDetail
}) {
    return (
        <DownloadFormWrapper>
            <div className='head-wrapper'>
                <div className='title'>다운로드 양식</div>
                <div>
                    <button
                        type='button'
                        className='add-field-button'
                        onClick={onActionAddField}
                    >
                        헤더 추가
                    </button>
                </div>
            </div>
            <div className='body-wrapper'>
                <div className='list-wrapper'>
                    {valueUtils.isEmptyValues(updateHeader?.headerDetail?.details) &&
                        <div style={{ textAlign: 'center', margin: '100px 0', fontWeight: '500' }}>헤더를 추가해 주세요.</div>
                    }
                    {!valueUtils.isEmptyValues(updateHeader?.headerDetail?.details) &&
                        <DragDropContext onDragEnd={onChangeDetailsOrder}>
                            <Droppable droppableId={uuidv4()}>
                                {(provided, snapshot) => (
                                    <div
                                        className='list-box'
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className='list-item'>
                                            <div className='w-4p list-item-content bold-600'>순서</div>
                                            <div className='w-18p list-item-content bold-600'>헤더명</div>
                                            <div className='w-9p list-item-content bold-600'>필드 타입</div>
                                            <div className='w-18p list-item-content bold-600'>필드값</div>
                                            <div className='w-9p list-item-content bold-600'>필드 구분자</div>
                                            <div className='w-18p list-item-content bold-600'>고정값</div>
                                            <div className='w-9p list-item-content bold-600'>병합 사용</div>
                                            <div className='w-9p list-item-content bold-600'>병합 구분자</div>
                                            <div className='w-6p list-item-content bold-600'>삭제</div>
                                        </div>
                                        {updateHeader?.headerDetail?.details?.map((r, index) => {
                                            return (
                                                <Draggable
                                                    key={r.id}
                                                    draggableId={r.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            key={r.id}
                                                            className='list-item'
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style }}
                                                        >
                                                            <div className='w-4p list-item-content'>{index + 1}</div>
                                                            <div className='w-18p list-item-content'>
                                                                <input
                                                                    type='text'
                                                                    className='table-input-el'
                                                                    name={`headerDetail.details[${index}].customCellName`}
                                                                    value={r.customCellName || ''}
                                                                    onChange={onChangeValueOfName}
                                                                ></input>
                                                            </div>
                                                            <div className='w-9p list-item-content'>
                                                                <SingleBlockButton
                                                                    onClick={() => onActionOpenChangeFieldTypeModal(r)}
                                                                    style={{ padding: '6px 0', margin: '0', fontSize: 12 }}
                                                                >
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 15 }}>
                                                                        {r.fieldType}
                                                                    </div>
                                                                </SingleBlockButton>
                                                            </div>
                                                            <div className='w-18p list-item-content'>
                                                                {r.fieldType === '일반' ?
                                                                    <>
                                                                        <div>
                                                                            {r.viewDetails.map(viewDetail => {
                                                                                return (
                                                                                    <div style={{
                                                                                        color: '#2c73d2',
                                                                                        borderLeft: '3px solid #2c73d260',
                                                                                        marginBottom: '8px'
                                                                                    }}>
                                                                                        {defaultHeaderDetails.filter(r => r.matchedColumnName === viewDetail.matchedColumnName)[0].originCellName}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        <div>
                                                                            <SingleBlockButton
                                                                                onClick={() => onActionOpenAddViewDetailModal(r)}
                                                                                style={{ padding: '6px 0', margin: '0', fontSize: 12, width: 50, marginLeft: 'auto', marginRight: 'auto' }}
                                                                            >
                                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 15 }}>
                                                                                    설정
                                                                                </div>
                                                                            </SingleBlockButton>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='item-content-blind'></div>
                                                                }
                                                            </div>
                                                            <div className='w-9p list-item-content'>
                                                                {r.fieldType === '일반' ?
                                                                    <SingleBlockButton
                                                                        type='button'
                                                                        style={{ padding: '6px 0', margin: '0', fontSize: 12, width: 60, marginLeft: 'auto', marginRight: 'auto' }}
                                                                        onClick={() => onActionOpenValueSplitterModal(r)}
                                                                    >
                                                                        <Splitter
                                                                            splitter={r.valueSplitter}
                                                                        />
                                                                    </SingleBlockButton>
                                                                    :
                                                                    <div className='item-content-blind'></div>
                                                                }
                                                            </div>
                                                            <div className='w-18p list-item-content'>
                                                                {r.fieldType === '고정값' ?
                                                                    <>
                                                                        <input
                                                                            type='text'
                                                                            className='table-input-el'
                                                                            name={`headerDetail.details[${index}].fixedValue`}
                                                                            value={r.fixedValue || ''}
                                                                            onChange={onChangeValueOfName}
                                                                        ></input>
                                                                    </>
                                                                    :
                                                                    <div className='item-content-blind'></div>
                                                                }
                                                            </div>
                                                            <div className='w-9p list-item-content'>
                                                                {r.fieldType === '운송코드' ?
                                                                    <div className='item-content-blind'></div>
                                                                    :
                                                                    <button
                                                                        type='button'
                                                                        className={`switch-button ${r.mergeYn === 'y' ? 'switch-button-on' : 'switch-button-off'}`}
                                                                        name={`headerDetail.details[${index}].mergeYn`}
                                                                        value={r.mergeYn === 'y' ? 'n' : 'y'}
                                                                        onClick={onChangeValueOfName}
                                                                    >
                                                                        {r.mergeYn === 'y' ? 'ON' : 'OFF'}
                                                                    </button>
                                                                }
                                                            </div>
                                                            <div className='w-9p list-item-content'>
                                                                {r.fieldType === '운송코드' ?
                                                                    <div className='item-content-blind'></div>
                                                                    :
                                                                    <>
                                                                        {r.mergeYn === 'y' ?
                                                                            <SingleBlockButton
                                                                                type='button'
                                                                                style={{ padding: '6px 0', margin: '0', fontSize: 12, width: 60, marginLeft: 'auto', marginRight: 'auto' }}
                                                                                onClick={() => onActionOpenMergeSplitterModal(r)}
                                                                            >
                                                                                <Splitter
                                                                                    splitter={r.mergeSplitter}
                                                                                />
                                                                            </SingleBlockButton>
                                                                            :
                                                                            <div className='item-content-blind'></div>
                                                                        }
                                                                    </>
                                                                }
                                                            </div>
                                                            <div className='w-6p list-item-content'>
                                                                <button
                                                                    type='button'
                                                                    className={`delete-button-el`}
                                                                    onClick={() => onActionDeleteHeaderDetail(r)}
                                                                >
                                                                    <img
                                                                        src='/assets/icon/delete_icon.png'
                                                                        className='delete-button-icon'
                                                                        alt='delete icon'
                                                                    ></img>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    }
                </div>
            </div>
        </DownloadFormWrapper >
    );
}