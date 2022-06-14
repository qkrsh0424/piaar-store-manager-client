import { useEffect, useState } from 'react'
import HeaderFieldView from "./HeaderField.view";
import ImageFieldView from "./ImageField.view";

import { Container } from "./ProductStockAnalysisModal.styled";
import TableFieldView from "./TableField.view";

const ProductStockAnalysisModalComponent = (props) => {
    const [prodDetailRankList, setProdDetailRankList] = useState(null);
    const [prodTotalStock, setProdTotalStock] = useState(null);

    useEffect(() => {
        function getProdDetailRank () {
            if(!(props.stockAnalysisViewList && props.selectedProductId)) {
                return;
            }

            let prodRank = props.stockAnalysisViewList.map((r, index) => {
                if(r.product.id === props.selectedProductId) {
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

    // Get product total stock sum unit & stock property.
    useEffect(() => {
        function getTotalSales() {
            if(!prodDetailRankList) {
                return;
            }
            
            let totalStockSumUnit = 0;
            let totalStockProperty = 0;
            let totalEstimatedSalesPrice = 0;
            prodDetailRankList.forEach(r => {
                totalStockSumUnit += r.stockSumUnit;
                totalStockProperty += r.stockProperty;
                totalEstimatedSalesPrice += r.estimatedSalesPrice;
            });

            setProdTotalStock({
                totalStockSumUnit,
                totalStockProperty,
                totalEstimatedSalesPrice
            });
        }

        getTotalSales();
    }, [prodDetailRankList]);

    return (
        <Container>
            <HeaderFieldView
                onActionCloseProductStockAnalysisModal={() => props.onActionCloseProductStockAnalysisModal()}
            ></HeaderFieldView>

            {prodDetailRankList && prodTotalStock &&
                <>
                    <ImageFieldView
                        prodDetailRankItem={prodDetailRankList[0]}
                    ></ImageFieldView>
                    <TableFieldView
                        searchInfoState={props.searchInfoState}
                        prodTotalStock={prodTotalStock}
                        prodDetailRankList={prodDetailRankList}
                    ></TableFieldView>
                </>
            }

        </Container>
    )
}

export default ProductStockAnalysisModalComponent;