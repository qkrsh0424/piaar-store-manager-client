import { Container } from "./RankTable.styled";
import TableFieldView from "./TableField.view";

const RankBoardComponent = (props) => {

    return (
        <Container>
            <TableFieldView
                searchInfoState={props.searchInfoState}
                salesAnalysisViewItems={props.salesAnalysisViewItems}
            >
            </TableFieldView>
        </Container>
    )
}

export default RankBoardComponent;
