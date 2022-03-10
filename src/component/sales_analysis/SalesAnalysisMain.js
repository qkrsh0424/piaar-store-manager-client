import { useState, useEffect } from 'react';

import { withRouter } from 'react-router';
import { salesAnalysisDataConnect } from '../../data_connect/salesAnalysisDataConnect';
import BackdropLoading from '../loading/BackdropLoading';
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SalesAnalysisBody from './SalesAnalysisBody';

const SalesAnalysisMain = () => {
    const [salesAnalysisItems, setSalesAnalysisItems] = useState(null);
    const [backdropLoading, setBackdropLoading] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            setBackdropLoading(true);
            await __handleDataConnect().searchSalesAnalysis();
            setBackdropLoading(false);
        }
        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchSalesAnalysis: async function () {
                await salesAnalysisDataConnect().searchAll()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSalesAnalysisItems(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <BackdropLoading open={backdropLoading} />

            <SalesAnalysisBody
                salesAnalysisItems={salesAnalysisItems}

            ></SalesAnalysisBody>
        </>
    )
}

export default withRouter(SalesAnalysisMain);