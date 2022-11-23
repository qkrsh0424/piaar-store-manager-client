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
