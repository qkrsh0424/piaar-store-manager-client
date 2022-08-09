import { Chart } from "react-chartjs-2";
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from "./ProductSalesRevenueGraph.styled";

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            <div>
                <span className='info-text'>* 판매 데이터 기준 TOP10</span>
            </div>
            <div className='flex-box'>
                <div className='half-type-graph graph-wrapper'>
                    <Chart
                        data={createGraphData(props.optionRevenueGraphData?.revenue)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
                <div className='half-type-graph graph-wrapper'>
                    <Chart
                        data={createGraphData(props.optionRevenueGraphData?.unit)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            </div>
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;
