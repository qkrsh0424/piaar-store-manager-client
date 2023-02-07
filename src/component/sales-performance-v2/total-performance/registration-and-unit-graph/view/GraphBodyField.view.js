import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { createGraphData, createGraphOption } from "../../../../../utils/chartUtils";
import { GraphBodyFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBodyFieldView (props) {
    return (
        <GraphBodyFieldWrapper>
            {props.totalGraphData && props.graphOption &&
                <div className='graph-wrapper'>
                    <Chart
                        data={createGraphData(props.totalGraphData)}
                        options={createGraphOption(props.graphOption)}
                    />
                </div>
            }
        </GraphBodyFieldWrapper>
    )
}