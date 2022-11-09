import { productDataConnect } from "../../../../data_connect/productDataConnect";

export default function useProductHook (props) {

    const reqDeleteOne = async (id) => {
        await productDataConnect().deleteOne(id)
            .then(res => {
                if (res.status === 200) {
                    alert('정상적으로 삭제되었습니다.');
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
