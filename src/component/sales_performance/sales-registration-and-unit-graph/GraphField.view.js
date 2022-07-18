import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from './SalesRegistrationAndUnitGraph.styled';

const graphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    }
}

ChartJS.register(...registerables);

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.orderAnalysisGraphData &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.orderAnalysisGraphData)}
                        options={createBarGraphOption(graphOption)}
                    />
                </div>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
