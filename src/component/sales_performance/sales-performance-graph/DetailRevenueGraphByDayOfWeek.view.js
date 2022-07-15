import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { DayRevenueGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const graphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    }
}

ChartJS.register(...registerables);

const DetailRevenueGraphByDayOfWeekFieldView = (props) => {

    return (
        <DayRevenueGraphFieldWrapper>
            {props.optionRevenueGraphByDayOfWeekData &&
                <>
                    <div className='half-type-graph md-height-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.total)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                    <div className='half-type-graph md-height-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.week)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                </>
            }
        </DayRevenueGraphFieldWrapper>
    )
}

export default DetailRevenueGraphByDayOfWeekFieldView;
