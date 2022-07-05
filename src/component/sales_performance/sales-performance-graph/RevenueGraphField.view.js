import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import { createBarGraphOption, createGraphData } from "../../../utils/chartUtils";
import { RevenueGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const lineGraphOption = {
    responsive: true,
    maintainAspectRatio: false
}

ChartJS.register(...registerables);

const RevenueGraphFieldView = (props) => {
    return (
        <RevenueGraphFieldWrapper>
            <Line
                data={createGraphData(props.revenueGraphData)}
                options={createBarGraphOption(lineGraphOption)}
            />
        </RevenueGraphFieldWrapper>
    )
}

export default RevenueGraphFieldView;
