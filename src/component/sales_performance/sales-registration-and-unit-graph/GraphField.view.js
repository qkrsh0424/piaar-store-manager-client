import { Chart } from "react-chartjs-2";
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from './SalesRegistrationAndUnitGraph.styled';

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.orderAnalysisGraphData &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.orderAnalysisGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
