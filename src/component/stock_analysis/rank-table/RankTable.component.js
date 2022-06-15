import { useState } from "react";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import ProductStockAnalysisModalComponent from "../product-stock-analysis-modal/ProductStockAnalysisModal.component";
import { Container } from "./RankTable.styled";
import TableFieldView from "./TableField.view";

const RankBoardComponent = (props) => {
    const [productStockAnalysisModalOpen, setProductStockAnalysisModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const onActionOpenProductStockAnalysisModal = (productId) => {
        setSelectedProductId(productId);
        setProductStockAnalysisModalOpen(true);
    }

    const onActionCloseProductStockAnalysisModal = () => {
        setProductStockAnalysisModalOpen(false);
    }

    return (
        <Container>
            <TableFieldView
                stockAnalysisViewList={props.stockAnalysisViewList}
                totalStockInfo={props.totalStockInfo}

                onActionOpenProductStockAnalysisModal={(productId) => onActionOpenProductStockAnalysisModal(productId)}
            >
            </TableFieldView>
            
            {/* Modal */}
            <CommonModalComponent
                open={productStockAnalysisModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseProductStockAnalysisModal}
            >
                <ProductStockAnalysisModalComponent
                    selectedProductId={selectedProductId}
                    stockAnalysisViewList={props.stockAnalysisViewList}

                    onActionCloseProductStockAnalysisModal={() => onActionCloseProductStockAnalysisModal()}
                ></ProductStockAnalysisModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default RankBoardComponent;
