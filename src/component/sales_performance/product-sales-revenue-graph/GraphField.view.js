import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from "./ProductSalesRevenueGraph.styled";

ChartJS.register(...registerables);

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            <div>
                <span className='info-text'>* 판매 데이터 기준 TOP10</span>
            </div>
            <div className='flex-box'>
                <div className='half-type-graph graph-wrapper'>
                    <Bar
                        data={createGraphData(props.optionRevenueGraphData?.revenue)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
                <div className='half-type-graph graph-wrapper'>
                    <Bar
                        data={createGraphData(props.optionRevenueGraphData?.unit)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            </div>
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
