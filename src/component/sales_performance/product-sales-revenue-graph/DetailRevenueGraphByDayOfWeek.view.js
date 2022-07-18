import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { RevenueByWeekGraphFieldWrapper } from "./ProductSalesRevenueGraph.styled";

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
        <RevenueByWeekGraphFieldWrapper>
            {props.optionRevenueGraphByDayOfWeekData &&
                <>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.total)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.week)}
                            options={createBarGraphOption(graphOption)}
                        />
                    </div>
                </>
            }
        </RevenueByWeekGraphFieldWrapper>
    )
}

export default DetailRevenueGraphByDayOfWeekFieldView;
