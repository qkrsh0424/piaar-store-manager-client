import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DetailInfoWrapper } from "./DetailTable.styled";

export default function DetailInfoTableFieldView(props) {
    return (
        <DetailInfoWrapper>
            <div className="group-title">상세
                <div className="control-box">
                    <button className="add-btn"
                        type='button'
                        onClick={() => props.onActionOpenCreateProductDetailModal()}
                    >
                        <AddIcon />
                    </button>
                    <button className="modify-btn"
                        onClick={() => props.onActionOpenModifyProductDetailModal()}
                    >
                        <EditIcon />
                    </button>
                    <button className="delete-btn"
                        onClick={() => props.onActionDeleteProductDetail()}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className="data-container">
                <div className="detail-header">
                    <div>가로(cm)</div>
                    <div>세로(cm)</div>
                    <div>높이(cm)</div>
                    <div>내품수량(ea)</div>
                    <div>무게(kg)</div>
                    <div className="grid-span-2">CBM</div>
                </div>
                {props.detailViewList?.map((r, index) => {
                    return(
                        <div
                            key={`product_detail_idx` + index}
                            className={parseInt(props.detailCid) === r.cid ? `data-active` : '' || `data-hover`}
                            onClick={() => props.onChangeDetailCidValue(r.cid)}
                        >
                            <div>{r.detailWidth}</div>
                            <div>{r.detailLength}</div>
                            <div>{r.detailHeight}</div>
                            <div>{r.detailQuantity}</div>
                            <div>{r.detailWeight}</div>
                            <div className="grid-span-2">{r.detailCbm}</div>
                        </div>
                    )
                })}
            </div>
        </DetailInfoWrapper>
    )
}