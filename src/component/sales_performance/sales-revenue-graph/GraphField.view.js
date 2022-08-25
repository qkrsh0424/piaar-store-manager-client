import _ from 'lodash';
import { Chart } from 'react-chartjs-2';
import { createGraphOption, createGraphData } from "../../../utils/chartUtils";
import { GraphFieldWrapper } from './SalesRevenueGraph.styled';

const GraphFieldView = (props) => {
    return (
        <GraphFieldWrapper>
            {props.searchItem === 'total' &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.revenueGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'salesChannel' &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.revenueGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'category' &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.revenueGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'product' &&
                <div>
                    <div>
                        <span className='info-text'>* 판매 데이터 기준 TOP15</span>
                    </div>
                    <div className='flex-box'>
                        <div className='graph-wrapper half-type-graph'>
                            <Chart
                                data={createGraphData(props.revenueGraphData?.revenue)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                        <div className='graph-wrapper half-type-graph'>
                            <Chart
                                data={createGraphData(props.revenueGraphData?.unit)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                    </div>
                </div>
            }
        </GraphFieldWrapper>
    )
}

export default GraphFieldView;