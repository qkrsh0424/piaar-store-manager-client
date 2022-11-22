import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";

export default function useProductOptionHook (props) {

    const reqDeleteOne = async (id, snackbarOpen) => {
        await productOptionDataConnect().deleteOne(id)
            .then(res => {
                if (res.status === 200) {
                    snackbarOpen();
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return {
        reqDeleteOne
    }
}
