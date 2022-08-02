import { Doughnut } from "react-chartjs-2";
import { createGraphData, createGraphOption } from "../../../utils/chartUtils";
import { AnalysisGraphFieldWrapper } from "./AnalysisGraph.styled";

const AnalysisGraphFieldView = (props) => {
    return (
        <AnalysisGraphFieldWrapper>
            {props.productAnalysisGraphData &&
                <div className='chart-group'>
                    <div>
                        <div className='chart-title'>
                            <span>1. 상품 재고자산 TOP{props.bestItemUnit}</span>
                        </div>
                        <div className='graph-wrapper'>
                            <Doughnut
                                data={createGraphData(props.productAnalysisGraphData.property)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='chart-title'>
                            <span>2. 상품 재고수량 TOP{props.bestItemUnit}</span>
                        </div>
                        <div className='graph-wrapper'>
                            <Doughnut
                                data={createGraphData(props.productAnalysisGraphData.unit)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                    </div>
                </div>
            }
            {props.optionAnalysisGraphData &&
                <div className='chart-group'>
                    <div>
                        <div className='chart-title'>
                            <span>3. 옵션 재고자산 TOP{props.bestItemUnit}</span>
                        </div>
                        <div className='graph-wrapper'>
                            <Doughnut
                                data={createGraphData(props.optionAnalysisGraphData.property)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='chart-title'>
                            <span>4. 옵션 재고수량 TOP{props.bestItemUnit}</span>
                        </div>
                        <div className='graph-wrapper'>
                            <Doughnut
                                data={createGraphData(props.optionAnalysisGraphData.unit)}
                                options={createGraphOption(props.graphOption)}
                            />
                        </div>
                    </div>
                </div>
            }
        </AnalysisGraphFieldWrapper>
    )
}

export default AnalysisGraphFieldView;