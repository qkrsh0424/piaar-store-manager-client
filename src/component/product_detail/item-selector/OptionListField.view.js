import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataListWrapper } from "./ItemSelector.styled";

export default function OptionListFieldView(props) {
    return (
        <DataListWrapper>
            <div className="control-box">
                <button className="add-btn"
                    onClick={() => props.onActionOpenCreateProductOptionModal()}
                >
                    <AddIcon />
                </button>
                <button className="modify-btn">
                    <EditIcon />
                </button>
                <button className="delete-btn"
                    onClick={() => props.onActionDeleteProductOption()}
                >
                    <DeleteIcon />
                </button>
            </div>
            <div className="item-list">
                <div className="fixed-header">
                    <div>옵션</div>
                    <div>옵션명</div>
                </div>
                {props.optionViewList?.map((r, index) => {
                    return (
                        <div key={'option-view-list' + index}
                            className={parseInt(props.optionCid) === r.cid ? `data-active` : '' || `data-hover`}
                            onClick={() => props.onChangeOptionCidValue(r.cid)}
                        >
                            <div className="image-box">
                                {r.imageUrl ?
                                    <img src={r.imageUrl} title={r.imageFileName} />
                                    :
                                    <img src='/images/icon/no-image.jpg' title='no-image' />
                                }
                            </div>
                            <div className="prod-default-name">
                                <span>{r.defaultName}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </DataListWrapper>
    )
}