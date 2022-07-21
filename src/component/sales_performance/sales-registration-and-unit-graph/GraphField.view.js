import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from './SalesRegistrationAndUnitGraph.styled';

ChartJS.register(...registerables);

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.orderAnalysisGraphData &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.orderAnalysisGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
