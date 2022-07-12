import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { OrderAnalysisGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const graphOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    }
}

ChartJS.register(...registerables);

const OrderAnalysisGraphFieldView = (props) => {
    return (
        <OrderAnalysisGraphFieldWrapper>
            {props.orderAnalysisGraphData &&
                <div className='graph-wrapper'>
                    <Bar
                        data={createGraphData(props.orderAnalysisGraphData)}
                        options={createBarGraphOption(graphOption)}
                    />
                </div>
            }
        </OrderAnalysisGraphFieldWrapper>
    )
}

export default OrderAnalysisGraphFieldView;
