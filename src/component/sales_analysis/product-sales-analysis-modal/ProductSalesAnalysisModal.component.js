import { useEffect, useState } from 'react'
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import HeaderFieldView from "./HeaderField.view";
import ImageFieldView from "./ImageField.view";

import { Container } from "./ProductSalesAnalysisModal.styled";
import TableFieldView from "./TableField.view";

const ProductSalesAnalysisModalComponent = (props) => {
    const [prodDetailRankList, setProdDetailRankList] = useState(null);
    const [prodTotalSales, setProdTotalSales] = useState(null);

    useEffect(() => {
        function getProdDetailRank () {
            if(!(props.salesAnalysisViewItems && props.selectedProductId)) {
                return;
            }

            let prodRank = props.salesAnalysisViewItems.map((r, index) => {
                if(r.salesProductId === props.selectedProductId) {
                    return {
                        ...r,
                        optionRank: parseInt(index+1)
                    }
                }
            }).filter(r => r);

            setProdDetailRankList(prodRank);
        }

        getProdDetailRank();
    }, []);

    // Get product total sales unit & revenue.
    useEffect(() => {
        function getTotalSales() {
            if(!prodDetailRankList) {
                return;
            }

            let prodTotalSales = prodDetailRankList.map(r => {
                return {
                    ...r,
                    unit : r[props.searchInfoState?.storeSalesUnit],
                    revenue : r[props.searchInfoState?.storeSalesUnit] * r.salesOptionPrice
                }
            });
            
            let totalUnit = 0;
            let totalRevenue = 0;
            prodTotalSales.forEach(r => {
                totalUnit += r.unit;
                totalRevenue += r.revenue;
            });

            setProdTotalSales({
                totalUnit : totalUnit,
                totalRevenue : totalRevenue?.toLocaleString()
            });
        }

        getTotalSales();
    }, [prodDetailRankList]);

    return (
        <Container>
            <HeaderFieldView
                onActionCloseProductSalesAnalysisModal={() => props.onActionCloseProductSalesAnalysisModal()}
            ></HeaderFieldView>

            {prodDetailRankList &&
                <>
                    <ImageFieldView
                        prodDetailRankItem={prodDetailRankList[0]}
                    ></ImageFieldView>
                    <TableFieldView
                        searchInfoState={props.searchInfoState}
                        prodTotalSales={prodTotalSales}
                        prodDetailRankList={prodDetailRankList}
                    ></TableFieldView>
                </>
            }

        </Container>
    )
}

export default ProductSalesAnalysisModalComponent;