import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { createGraphOption, createDashboardGraphData, createGraphData } from '../../../../../utils/chartUtils';
import { DefaultChartFieldWrapper } from "./ItemAnalysisChart.styled";


const DEFAULT_CHART_COLUMN = ['totalRevenue', 'totalUnit', 'totalOrder'];

const graphOption = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false
}

ChartJS.register(...registerables);

export default function DefaultChartFieldView(props) {
    return (
        <DefaultChartFieldWrapper>
            {props.barGraphData && DEFAULT_CHART_COLUMN?.map((column, idx) => {
                if (props.barGraphData[column])
                    return (
                        <div key={`erp-bar-chart-idx` + idx} className='chart-box'>
                            <Bar
                                data={createGraphData(props.barGraphData[column])}
                                options={createGraphOption(graphOption)}
                            />
                        </div>
                    )
            })
            }
        </DefaultChartFieldWrapper>
    );
}
