import { useState } from 'react';
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import ProductSalesAnalysisModalComponent from "../product-sales-analysis-modal/ProductSalesAnalysisModal.component";
import { Container } from "./RankTable.styled";
import TableFieldView from "./TableField.view";


const RankBoardComponent = (props) => {
    const [productSalesAnalysisModalOpen, setProductSalesAnalysisModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const onActionOpenProductSalesAnalysisModal = (productId) => {
        setSelectedProductId(productId);
        setProductSalesAnalysisModalOpen(true);
    }

    const onActionCloseProductSalesAnalysisModal = () => {
        setProductSalesAnalysisModalOpen(false);
    }

    return (
        <Container>
            <TableFieldView
                searchInfoState={props.searchInfoState}
                salesAnalysisViewItems={props.salesAnalysisViewItems}

                onActionOpenProductSalesAnalysisModal={(productId) => onActionOpenProductSalesAnalysisModal(productId)}
            >
            </TableFieldView>

            {/* Modal */}
            <CommonModalComponent
                open={productSalesAnalysisModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseProductSalesAnalysisModal}
            >
                <ProductSalesAnalysisModalComponent
                    selectedProductId={selectedProductId}
                    searchInfoState={props.searchInfoState}
                    salesAnalysisViewItems={props.salesAnalysisViewItems}

                    onActionCloseProductSalesAnalysisModal={() => onActionCloseProductSalesAnalysisModal()}
                ></ProductSalesAnalysisModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default RankBoardComponent;
