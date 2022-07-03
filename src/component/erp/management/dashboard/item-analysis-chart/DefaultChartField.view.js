import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { DefaultChartFieldWrapper } from "./ItemAnalysisChart.styled";

ChartJS.register(...registerables);

const analysisColumn = ['totalRevenue', 'totalUnit', 'totalOrder'];

export default function DefaultChartFieldView(props) {
    return (
        <DefaultChartFieldWrapper>
            {props.barGraphData &&
                analysisColumn?.map((column, idx) => {
                    if (props.barGraphData?.[column])
                        return (
                            <div key={`erp-bar-chart-idx` + idx} className='chart-box'>
                                <Bar
                                    data={
                                        {
                                            labels: props.barGraphData?.[column]?.labels,
                                            datasets: props.barGraphData?.[column]?.datasets
                                        }
                                    }
                                    options={{
                                        responsive: true,
                                        indexAxis: 'y'
                                    }}
                                />
                            </div>
                        )
                })
            }
        </DefaultChartFieldWrapper>
    );
}
