import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
             <div className='graph-wrapper'>
                {props.totalGraphData && props.totalGraphOption &&
                    <Chart
                        data={createGraphData(props.totalGraphData)}
                        options={createGraphOption(props.totalGraphOption)}
                    />
                }
            </div>
        </GraphBodyFieldWrapper>
    )
}