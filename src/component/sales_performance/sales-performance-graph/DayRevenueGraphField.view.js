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

const DayRevenueGraphFieldView = (props) => {

    return (
        <DayRevenueGraphFieldWrapper>
            {props.dayRevenueGraphData &&
                <>
                    <div className='graph-wrapper'>
                        <Bar
                            data={createGraphData(props.dayRevenueGraphData?.total)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                    <div className='graph-wrapper'>
                        <Bar
                            data={createGraphData(props.dayRevenueGraphData?.week)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                </>
            }
        </DayRevenueGraphFieldWrapper>
    )
}

export default DayRevenueGraphFieldView;
