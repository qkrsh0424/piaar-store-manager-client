import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from "./ProductSalesRevenueGraph.styled";

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

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.optionRevenueGraphData &&
                <>
                    <div>
                        <span className='info-text'>* 판매 데이터 기준 TOP10</span>
                    </div>
                    <div className='flex-box'>
                        <div className='half-type-graph graph-wrapper'>
                            <Bar
                                data={createGraphData(props.optionRevenueGraphData?.revenue)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                        <div className='half-type-graph graph-wrapper'>
                            <Bar
                                data={createGraphData(props.optionRevenueGraphData?.unit)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                    </div>
                </>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
