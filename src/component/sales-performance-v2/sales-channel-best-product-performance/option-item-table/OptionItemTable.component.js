import { Container } from "./OptionItemTable.styled";
import _ from "lodash";
import TableFieldView from "./view/TableField.view";
import { useEffect, useState } from "react";
import TableTitleFieldView from "./view/TableTitleField.view";

// 판매스토어별 총 매출액
export default function OptionItemTableComponent(props) {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        if(!props.performance) {
            return;
        }

        __handle.action.initTableData();
    }, [props.performance])

    const __handle = {
        action: {
            initTableData: () => {
                let tableData = [...new Set(props.performance.map(r => JSON.stringify({
                    productCode: r.productCode,
                    productDefaultName: r.productDefaultName,
                    performance: []
                })))].map(r => JSON.parse(r));

                props.performance.forEach(r => {
                    tableData = tableData.map(r2 => {
                        if(r.productCode === r2.productCode) {
                            let data = r2.performance;
                            data.push(r);

                            return {
                                ...r2,
                                performance: data
                            }
                        }else {
                            return r2;
                        }
                    });
                })

                setTableData(tableData);
            }
        }
    }

    return (
        <>
            <Container>
                <TableTitleFieldView />
                <div className='content-box'>
                    <TableFieldView
                        tableData={tableData}
                        detailSearchValue={props.detailSearchValue}
                    />
                </div>
            </Container>
        </>
    )
}