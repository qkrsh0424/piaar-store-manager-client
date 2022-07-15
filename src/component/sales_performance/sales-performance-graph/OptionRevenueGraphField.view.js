import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { RevenueGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const verticalGraphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: true
    },
    indexAxis: 'y'
}

ChartJS.register(...registerables);

const OptionRevenueGraphFieldView = (props) => {

    return (
        <RevenueGraphFieldWrapper>
            {props.optionRevenueGraphData &&
                <>
                    <div>
                        <span className='info-text'>* 주문 데이터 기준 TOP10</span>
                    </div>
                    <div className='flex-box'>
                        <div className='half-type-graph md-height-graph'>
                            <Bar
                                data={createGraphData(props.optionRevenueGraphData?.revenue)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                        <div className='half-type-graph md-height-graph'>
                            <Bar
                                data={createGraphData(props.optionRevenueGraphData?.unit)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                    </div>
                </>
            }
        </RevenueGraphFieldWrapper>
    )
}

export default OptionRevenueGraphFieldView;
