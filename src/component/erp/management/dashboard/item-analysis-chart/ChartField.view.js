import { ChartFieldWrapper } from "./ItemAnalysisChart.styled";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const analysisItem = ['orderItemData', 'salesItemData', 'releaseCompleteItemData'];
const analysisColumn = ['salesChannel', 'categoryName', 'prodDefaultName'];

export default function ChartFieldView(props) {
    return (
        <ChartFieldWrapper>
            {props.doughnutGraphData && analysisItem?.map((item, index) => {
                if (props.doughnutGraphData?.[item])
                    return (
                        <div key={`erp-chart-group-idx` + index} className='chart-group-wrapper'>
                            <div className='chart-title'>
                                <span>{item === 'orderItemData' ? '1. 주문데이터 TOP3' : ''}</span>
                                <span>{item === 'salesItemData' ? '2. 판매데이터 TOP3' : ''}</span>
                                <span>{item === 'releaseCompleteItemData' ? '3. 출고데이터 TOP3' : ''}</span>
                            </div>
                            <div className='chart-group'>
                                {analysisColumn?.map((column, idx) => {
                                    return (
                                        <div key={`erp-doughnut-chart-idx` + idx} className="chart-box">
                                            <Doughnut
                                                data={
                                                    {
                                                        labels: props.doughnutGraphData?.[item]?.[column]?.labels,
                                                        datasets: props.doughnutGraphData?.[item]?.[column]?.datasets
                                                    }
                                                }
                                                options={{
                                                    responsive: true,
                                                    plugins: {
                                                        legend: {
                                                           position: 'right'
                                                        }
                                                     }
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
            }
            )}
        </ChartFieldWrapper>
    );
}
