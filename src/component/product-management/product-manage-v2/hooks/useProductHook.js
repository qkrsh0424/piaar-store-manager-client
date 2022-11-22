import { productDataConnect } from "../../../../data_connect/productDataConnect";

export default function useProductHook (props) {

    const reqDeleteOne = async (id, snackbarOpen) => {
        await productDataConnect().deleteOne(id)
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
