import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from "./SalesRevenueByWeekGraph.styled";

ChartJS.register(...registerables);

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.revenueByWeekGraphData &&
                <>
                    <div className='half-type-graph'>
                        <Chart
                            data={createGraphData(props.revenueByWeekGraphData?.total)}
                            options={createGraphOption(props.graphOption)}
                        />
                    </div>
                    <div className='half-type-graph'>
                        <Chart
                            data={createGraphData(props.revenueByWeekGraphData?.week)}
                            options={createGraphOption(props.graphOption)}
                        />
                    </div>
                </>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
