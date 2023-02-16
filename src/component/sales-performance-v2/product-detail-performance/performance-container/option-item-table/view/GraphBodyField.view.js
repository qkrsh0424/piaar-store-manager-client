import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { createGraphData, createGraphOption } from '../../../../../../utils/chartUtils';
import { GraphBodyFieldWrapper } from '../OptionItemTable.styled';

export default function GraphBodyFieldView(props) {
    return (
        <GraphBodyFieldWrapper>
            <div className='half-type-graph graph-wrapper'>
                <div className='graph-title'>[판매 매출액 비율]</div>
                {props.payAmountGraphData && props.graphOption &&
                    <Doughnut
                        plugins={[ChartDataLabels]}
                        data={createGraphData(props.payAmountGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
            <div className='half-type-graph graph-wrapper'>
                <div className='graph-title'>[판매 수량 비율]</div>
                {props.unitGraphData && props.graphOption &&
                    <Doughnut
                        plugins={[ChartDataLabels]}
                        data={createGraphData(props.unitGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}
