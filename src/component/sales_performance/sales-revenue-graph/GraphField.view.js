import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from './SalesRevenueGraph.styled';

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

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
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
                <div>
                    <div>
                        {console.log(props.revenueGraphData)}
                        <span className='info-text'>* 판매 데이터 기준 TOP15</span>
                    </div>
                    <div className='flex-box'>
                        <div className='half-type-graph graph-wrapper'>
                            <Bar
                                data={createGraphData(props.revenueGraphData?.revenue)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                        <div className='half-type-graph graph-wrapper'>
                            <Bar
                                data={createGraphData(props.revenueGraphData?.unit)}
                                options={createBarGraphOption(verticalGraphOption)}
                            />
                        </div>
                    </div>
                </div>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
