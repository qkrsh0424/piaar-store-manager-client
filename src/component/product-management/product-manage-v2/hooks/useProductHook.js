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
                let message = res?.data.memo;
                if (res?.status === 500) {
                    message = 'undefined error.';
                }

                throw new Error(message);
            })
    }

    return {
        reqDeleteOne
    }
}
