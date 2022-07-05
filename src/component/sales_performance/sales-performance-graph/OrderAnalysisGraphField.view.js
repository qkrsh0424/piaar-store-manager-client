import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { OrderAnalysisGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const graphOption = {
    responsive: true,
    maintainAspectRatio: false
}

ChartJS.register(...registerables);

const OrderAnalysisGraphFieldView = (props) => {
    return (
        <OrderAnalysisGraphFieldWrapper>
            <Bar
                data={createGraphData(props.orderAnalysisGraphData)}
                options={createBarGraphOption(graphOption)}
            />
        </OrderAnalysisGraphFieldWrapper>
    )
}

export default OrderAnalysisGraphFieldView;
