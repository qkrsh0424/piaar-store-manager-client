import { useEffect, useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateReceiveModalComponent from '../create-receive-modal/CreateReceiveModal.component';
import CreateReleaseModalComponent from '../create-release-modal/CreateReleaseModal.component';
import ReceiveAndReleaseModalComponent from '../receive-and-release-modal/ReceiveAndReleaseModal.component';
import { Container } from './ProductManageNav.styled';

import ProductManageNavFieldView from "./ProductManageNavField.view";

class ProductRelease {
    constructor(productCid) {
        this.id = uuidv4();
        this.releaseUnit = 0;
        this.memo = '';
        this.productOptionCid = productCid;
    }

    toJSON() {
        return {
            id: this.id,
            releaseUnit: this.releaseUnit,
            memo: this.memo,
            productOptionCid: this.productOptionCid
        }
    }
}

class ProductReceive {
    constructor(productCid) {
        this.id = uuidv4();
        this.receiveUnit = 0;
        this.memo = '';
        this.productOptionCid = productCid;
    }

    toJSON() {
        return {
            id: this.id,
            receiveUnit: this.receiveUnit,
            memo: this.memo,
            productOptionCid: this.productOptionCid
        }
    }
}

const ProductManageNavComponent = (props) => {

    const [createReleaseModalOpen, setCreateReleaseModalOpen] = useState(false);
    const [releaseAddData, setReleaseAddData] = useState(null);
    const [releaseAddMemo, setReleaseAddMemo] = useState(null);

    const [createReceiveModalOpen, setCreateReceiveModalOpen] = useState(false);
    const [receiveAddData, setReceiveAddData] = useState(null);
    const [receiveAddMemo, setReceiveAddMemo] = useState(null);

    const [receiveAndReleaseModalOpen, setReceiveAndReleaseModalOpen] = useState(false);

    const onActionGetOptionToRelease = () => {
        let dataList = []
        props.productViewList.forEach(product => {
            product.options.forEach(option => {
                if (props.checkedOptionList.includes(option.id)) {
                    let json = {
                        product: product.product,
                        option: option,
                        productRelease: new ProductRelease(option.cid).toJSON()
                    }
                    dataList.push(json);
                }
            });
        });
        return dataList;
    }

    const onActionOpenCreateReleaseModal = () => {
        let releaseAddData = onActionGetOptionToRelease();
        if (releaseAddData.length < 1) {
            alert('출고할 데이터를 선택해주세요.');
            return;
        }
        setCreateReleaseModalOpen(true);
        setReleaseAddData(releaseAddData);
    }

    const onActionCloseCreateReleaseModal = () => {
        setCreateReleaseModalOpen(false);
        setReleaseAddData(null);
        setReleaseAddMemo(null);
    }

    const onActionChangeReleaseInputValue = (e, releaseAddDataId) => {
        setReleaseAddData(releaseAddData.map(data => {
            if (data.productRelease.id === releaseAddDataId) {
                return {
                    ...data,
                    productRelease: {
                        ...data.productRelease,
                        [e.target.name]: e.target.value
                    }
                }
            } else {
                return data;
            }
        }));
    }

    const onActionChangeReleaseMemoInputValue = (e) => {
        setReleaseAddMemo(e.target.value);
    }

    const onSubmitCreateReleaseData = async (e) => {
        e.preventDefault();

        let releaseJsonList = [];
        releaseAddData.forEach(data => {
            if (data.productRelease.releaseUnit < 1) {
                return;
            } else {
                releaseJsonList.push(
                    {
                        ...data.productRelease,
                        memo: releaseAddMemo
                    }
                )
            }
        });

        if (!props.submitCheck.isSubmit) {
            await props._onSubmit_createProductReleaseList(releaseJsonList);
            onActionCloseCreateReleaseModal();
        }
    }

    const onActionGetOptionToReceive = () => {
        let dataList = []
        props.productViewList.forEach(product => {
            product.options.forEach(option => {
                if (props.checkedOptionList.includes(option.id)) {
                    let json = {
                        product: product.product,
                        option: option,
                        productReceive: new ProductReceive(option.cid).toJSON()
                    }
                    dataList.push(json);
                }
            });
        });
        return dataList;
    }

    const onActionOpenCreateReceiveModal = () => {
        let receiveAddData = onActionGetOptionToReceive();
        if (receiveAddData.length < 1) {
            alert('입고할 데이터를 선택해주세요.');
            return;
        }
        setReceiveAddData(receiveAddData);
        setCreateReceiveModalOpen(true);
    }

    const onActionCloseCreateReceiveModal = () => {
        setCreateReceiveModalOpen(false);
        setReceiveAddData(null);
        setReceiveAddMemo(null);
    }

    const onActionChangeReceiveInputValue = (e, receiveAddDataId) => {
        setReceiveAddData(receiveAddData.map(data => {
            if (data.productReceive.id === receiveAddDataId) {
                return {
                    ...data,
                    productReceive: {
                        ...data.productReceive,
                        [e.target.name]: e.target.value
                    }
                }
            } else {
                return data;
            }
        }))
    }

    const onActionChangeReceiveMemoInputValue = (e) => {
        setReceiveAddMemo(e.target.value);
    }

    const onSubmitCreateReceiveData = async (e) => {
        e.preventDefault();

        let receiveJsonList = [];
        receiveAddData.forEach(data => {
            if (data.productReceive.receiveUnit < 1) {
                return;
            } else {
                receiveJsonList.push(
                    {
                        ...data.productReceive,
                        memo: receiveAddMemo
                    }
                )
            }
        });

        if (!props.submitCheck.isSubmit) {
            await props._onSubmit_createProductReceiveList(receiveJsonList);
            onActionCloseCreateReceiveModal();
        }
    }

    const onActionOpenReceiveAndReleaseModal = () => {
        setReceiveAndReleaseModalOpen(true);
    }

    const onActionCloseReceiveAndReleaseModal = () => {
        setReceiveAndReleaseModalOpen(false);
    }

    const onActionSearchReceiveAndRelease = async (date) => {
        await props._onAction_searchReceiveAndRelease(date);
    }

    return (
        <Container>
            <ProductManageNavFieldView
                onActionOpenCreateReleaseModal={() => onActionOpenCreateReleaseModal()}
                onActionOpenCreateReceiveModal={() => onActionOpenCreateReceiveModal()}
                onActionOpenReceiveAndReleaseModal={() => onActionOpenReceiveAndReleaseModal()}
            ></ProductManageNavFieldView>

            {/* Release Create Modal */}
            <CommonModalComponent
                open={createReleaseModalOpen}
                maxWidth={'lg'}
                fullWidth={true}

                onClose={onActionCloseCreateReleaseModal}
            >
                <CreateReleaseModalComponent
                    releaseAddData={releaseAddData}
                    releaseAddMemo={releaseAddMemo}
                    submitCheck={props.submitCheck}

                    onActionCloseCreateReleaseModal={() => onActionCloseCreateReleaseModal()}
                    onActionChangeReleaseInputValue={(e, releaseAddDataId) => onActionChangeReleaseInputValue(e, releaseAddDataId)}
                    onActionChangeReleaseMemoInputValue={(e) => onActionChangeReleaseMemoInputValue(e)}
                    onSubmitCreateReleaseData={(e) => onSubmitCreateReleaseData(e)}
                ></CreateReleaseModalComponent>
            </CommonModalComponent>

            {/* Receive Create Modal */}
            <CommonModalComponent
                open={createReceiveModalOpen}
                maxWidth={'lg'}
                fullWidth={true}

                onClose={onActionCloseCreateReceiveModal}
            >
                <CreateReceiveModalComponent
                    receiveAddData={receiveAddData}
                    receiveAddMemo={receiveAddMemo}
                    submitCheck={props.submitCheck}

                    onActionCloseCreateReceiveModal={() => onActionCloseCreateReceiveModal()}
                    onActionChangeReceiveInputValue={(e, receiveAddDataId) => onActionChangeReceiveInputValue(e, receiveAddDataId)}
                    onActionChangeReceiveMemoInputValue={(e) => onActionChangeReceiveMemoInputValue(e)}
                    onSubmitCreateReceiveData={(e) => onSubmitCreateReceiveData(e)}
                ></CreateReceiveModalComponent>
            </CommonModalComponent>

            {/* Receive And Release Modal */}
            <CommonModalComponent
                open={receiveAndReleaseModalOpen}
                maxWidth={'lg'}
                fullWidth={true}

                onClose={onActionCloseReceiveAndReleaseModal}
            >
                <ReceiveAndReleaseModalComponent
                    optionReceiveStatusData={props.optionReceiveStatusData}
                    optionReleaseStatusData={props.optionReleaseStatusData}

                    onActionCloseReceiveAndReleaseModal={() => onActionCloseReceiveAndReleaseModal()}
                    onActionSearchReceiveAndRelease={(date) => onActionSearchReceiveAndRelease(date)}
                ></ReceiveAndReleaseModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default ProductManageNavComponent;