import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from "./SalesRevenueByWeekGraph.styled";

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
            {props.revenueByWeekGraphData &&
                <>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.revenueByWeekGraphData?.total)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.revenueByWeekGraphData?.week)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                </>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
