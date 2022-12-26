import { Container } from "./GraphOperator.styled";
import GraphOperatorFieldView from "./view/GraphOperatorField.view";

export default function GraphOperatorComponent(props) {
    return (
        <Container>
            <GraphOperatorFieldView
                searchDimension={props.searchDimension}
                checkedSwitch={props.checkedSwitch}

                onActionChangeSwitch={props.onActionChangeSwitch}
                onActionChangeSearchDimension={props.onActionChangeSearchDimension}
            />
        </Container>
    )
}