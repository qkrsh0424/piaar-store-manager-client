import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';

import { DataListWrapper } from "./ItemSelector.styled";
import { useSelector } from 'react-redux';

export default function ProductListFieldView(props) {
    const userRdx = useSelector(state => state.user);

    const location = useLocation();
    const navigate = useNavigate();

    let routerState = {
        routerUrl: location.pathname
    }

    return (
        <DataListWrapper>
            {userRdx.userInfo && !(userRdx.userInfo?.roles.includes("ROLE_LOGISTICS")) &&
                <div className="control-box">
                    <button className="add-btn"
                        type='button'
                        onClick={() => navigate('/products/create', {
                            state: routerState
                        })}
                    >
                        <AddIcon />
                    </button>
                    <button className="modify-btn"
                        onClick={() => props.onActionOpenModifyProductModal()}
                    >
                        <EditIcon />
                    </button>
                    <button className="delete-btn"
                        onClick={() => props.onActionDeleteProduct()}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            }
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
                            {console.log(r)}
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