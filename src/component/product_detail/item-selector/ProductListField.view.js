import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useHistory } from 'react-router-dom';

import { DataListWrapper } from "./ItemSelector.styled";

export default function ProductListFieldView(props) {
    const location = useLocation();
    const history = useHistory();

    let routerState = {
        prevUrl: location.pathname
    }

    return (
        <DataListWrapper>
            <div className="control-box">
                <button className="add-btn"
                    type='button'
                    onClick={() => history.push({
                        pathname:'/refactor/products/create',
                        state:routerState
                    })}
                >
                    <AddIcon />
                </button>
                <button className="modify-btn"
                    onClick={() => props.onActionOpenProductModifyModal()}
                >
                    <EditIcon />
                </button>
                <button className="delete-btn"
                    onClick={() => props.onActionDeleteProduct()}
                >
                    <DeleteIcon />
                </button>
            </div>
            <div className="item-list">
                <div className="fixed-header">
                    <div>상품</div>
                    <div>상품명</div>
                </div>
                {props.productViewList?.map((r, index) => {
                    return (
                        <div key={'product-view-list' + index}
                            className={parseInt(props.productCid) === r.cid ? `data-active` : '' || `data-hover`}
                            onClick={() => props.onChangeProductCidValue(r.cid)}
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