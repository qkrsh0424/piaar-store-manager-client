import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import { createBarGraphOption, createGraphData, createStackedBarGraphOption } from "../../../utils/chartUtils";
import { RevenueGraphFieldWrapper } from "./SalesPerformanceGraph.styled";

const lineGraphOption = {
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

const RevenueGraphFieldView = (props) => {
    return (
        props.revenueGraphData && 
        <RevenueGraphFieldWrapper>
            {/* {props.searchItem === 'total' && */}
                <Line
                    data={createGraphData(props.revenueGraphData)}
                    options={createBarGraphOption(lineGraphOption)}
                />
             {/* } */}
            {/* {props.searchItem === 'salesChannel' &&
                <Bar
                    data={createGraphData(props.revenueGraphData)}
                    options={createStackedBarGraphOption(stackedBarGraphOption)}
                />
            } */}
        </RevenueGraphFieldWrapper>
    )
}

export default RevenueGraphFieldView;
