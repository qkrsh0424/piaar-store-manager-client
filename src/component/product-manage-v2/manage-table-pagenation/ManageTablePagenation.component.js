import PagenationComponentV2 from "../../module/pagenation/PagenationComponentV2";
import { Container, SelectedInfoFieldWrapper } from "./ManageTablePagenation.styled";

function SelectedInfoFieldView({ size }) {
    return (
        <SelectedInfoFieldWrapper>
            <span>선택 </span>
            <span>(총 {size || 0}개)</span>
        </SelectedInfoFieldWrapper>
    )
}

const ManageTablePagenationComponent = (props) => {
    return (
        <Container>
            <SelectedInfoFieldView size={props.checkedOptionIdList?.length} />

            {props.productManagementList &&
                <PagenationComponentV2
                    align={'right'}
                    pageIndex={props.productManagementList?.number}
                    totalPages={props.productManagementList?.totalPages}
                    isFirst={props.productManagementList?.first}
                    isLast={props.productManagementList?.last}
                    totalElements={props.productManagementList?.totalElements}
                    sizeElements={[10, 30, 50, 100]}
                ></PagenationComponentV2>
            }
        </Container>
    );
}
export default ManageTablePagenationComponent;