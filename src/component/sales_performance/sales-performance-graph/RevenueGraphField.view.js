import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { RevenueGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const lineGraphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    }
}

const graphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    }
}

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

const RevenueGraphFieldView = (props) => {

    return (
        <RevenueGraphFieldWrapper>
            {props.searchItem === 'total' &&
                <div className='graph-wrapper'>
                    <Line
                        data={createGraphData(props.revenueGraphData)}
                        options={createBarGraphOption(lineGraphOption)}
                    />
                </div>
            }
            {props.searchItem === 'salesChannel' &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.revenueGraphData)}
                        options={createBarGraphOption(graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'category' &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.revenueGraphData)}
                        options={createBarGraphOption(graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'product' &&
                <div className='product-graph-box'>
                    <div>
                        <span className='info-text'>* 주문 데이터 기준 TOP15</span>
                    </div>
                    <div className='flex-box'>
                        <div className='product-graph-wrapper'>
                            <Bar
                                data={createGraphData(props.revenueGraphData?.revenue)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                        <div className='product-graph-wrapper'>
                            <Bar
                                data={createGraphData(props.revenueGraphData?.unit)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                    </div>
                </div>
            }
        </RevenueGraphFieldWrapper>
    )
}

export default RevenueGraphFieldView;
