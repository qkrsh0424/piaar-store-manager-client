import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { RevenueByWeekGraphFieldWrapper } from "./ProductSalesRevenueGraph.styled";

ChartJS.register(...registerables);

const DetailRevenueGraphByDayOfWeekFieldView = (props) => {
    return (
        <RevenueByWeekGraphFieldWrapper>
            {props.optionRevenueGraphByDayOfWeekData &&
                <>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.total)}
                            options={createGraphOption(props.dayOfWeekGraphOption)}
                        />
                    </div>
                    <div className='half-type-graph'>
                        <Bar
                            data={createGraphData(props.optionRevenueGraphByDayOfWeekData?.week)}
                            options={createGraphOption(props.dayOfWeekGraphOption)}
                        />
                    </div>
                </>
            }
        </RevenueByWeekGraphFieldWrapper>
    )
}

export default DetailRevenueGraphByDayOfWeekFieldView;
