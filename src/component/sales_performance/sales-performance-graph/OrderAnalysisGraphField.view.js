import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createBarGraphOption, createGraphData, createStackedBarGraphOption } from "../../../utils/chartUtils";
import { OrderAnalysisGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const graphOption = {
    responsive: true,
    maintainAspectRatio: false
}

const stackedBarGraphOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
        },
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
}

ChartJS.register(...registerables);

const OrderAnalysisGraphFieldView = (props) => {
    return (
        <OrderAnalysisGraphFieldWrapper>
            {props.searchItem === 'total' && props.orderAnalysisGraphData &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.orderAnalysisGraphData)}
                        options={createBarGraphOption(graphOption)}
                    />
                </div>
            }
            {props.searchItem === 'salesChannel' && props.detailOrderAnalysisGraphData &&
                <>
                    <div className='graph-wrapper'>
                        <Bar
                            data={createGraphData(props.detailOrderAnalysisGraphData.order)}
                            options={createStackedBarGraphOption(stackedBarGraphOption)}
                        />
                    </div>
                    <div className='graph-wrapper'>
                        <Bar
                            data={createGraphData(props.detailOrderAnalysisGraphData.unit)}
                            options={createStackedBarGraphOption(stackedBarGraphOption)}
                        />
                    </div>
                </>
            }
        </OrderAnalysisGraphFieldWrapper>
    )
}

export default OrderAnalysisGraphFieldView;
