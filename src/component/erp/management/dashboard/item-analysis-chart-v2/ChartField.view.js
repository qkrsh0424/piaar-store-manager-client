import { ChartFieldWrapper } from "./ItemAnalysisChart.styled";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { createDoughnutGraphOption, createGraphData } from "../../../../../utils/chartUtils";


const DETAIL_CHART_COLUMN = ['salesChannel', 'categoryName', 'prodDefaultName'];

const graphOption = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right'
        }
    },
    maintainAspectRatio: false
}

// ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(...registerables);


export default function ChartFieldView(props) {
    return (
        <ChartFieldWrapper>
            <div className='chart-group-wrapper'>
                <div className='chart-title'>
                    <span>1. 주문데이터 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.orderItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.orderItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Doughnut
                                            data={createGraphData(props.doughnutGraphData.orderItemData[column])}
                                            options={createDoughnutGraphOption(graphOption)}
                                        />
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div>
                <div className='chart-title'>
                    <span>2. 판매데이터 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.salesItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.salesItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Doughnut
                                            data={createGraphData(props.doughnutGraphData.salesItemData[column])}
                                            options={createDoughnutGraphOption(graphOption)}
                                        />
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div>
                <div className='chart-title'>
                    <span>3. 출고데이터 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.releaseCompleteItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.releaseCompleteItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Doughnut
                                            data={createGraphData(props.doughnutGraphData.releaseCompleteItemData[column])}
                                            options={createDoughnutGraphOption(graphOption)}
                                        />
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </ChartFieldWrapper>
    );
}
