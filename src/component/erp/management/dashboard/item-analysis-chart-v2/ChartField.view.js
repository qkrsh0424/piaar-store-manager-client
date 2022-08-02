import { ChartFieldWrapper } from "./ItemAnalysisChart.styled";
import { Bar } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";


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


export default function ChartFieldView(props) {
    return (
        <ChartFieldWrapper>
            <div className='chart-group-wrapper'>
                <div className='chart-title'>
                    <span>1. 주문데이터 매출 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.orderItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.orderItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Bar
                                            data={createGraphData(props.doughnutGraphData.orderItemData[column])}
                                            options={createGraphOption(graphOption)}
                                        />
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div>
                <div className='chart-title'>
                    <span>2. 판매데이터 매출 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.salesItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.salesItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Bar
                                            data={createGraphData(props.doughnutGraphData.salesItemData[column])}
                                            options={createGraphOption(graphOption)}
                                        />
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div>
                <div className='chart-title'>
                    <span>3. 출고데이터 매출 TOP3</span>
                </div>
                <div className='chart-group'>
                    {props.doughnutGraphData?.releaseCompleteItemData &&
                        DETAIL_CHART_COLUMN.map((column, idx) => {
                            if (props.doughnutGraphData.releaseCompleteItemData[column].labels.length > 0)
                                return (
                                    <div key={`erp-doughnut-chart-idx` + idx} className='chart-box'>
                                        <Bar
                                            data={createGraphData(props.doughnutGraphData.releaseCompleteItemData[column])}
                                            options={createGraphOption(graphOption)}
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
