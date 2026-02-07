import {constants} from "@/app/libs/constants.js";
import api from "@/app/libs/api.js";

const TransactionHistoryService = () => {
    const getTransactionHistoryList = async ({page = 0, size = 10} = {}) => {
        const url = '/auto/auto/transactionHistory'
      const response = await api.GET(url, {page, size});
        if(response.status !== constants.RESULT_SUCCESS){
            throw new Error('');
        }
        return response
    }

    return {
      getTransactionHistoryList,
    }
}

export default TransactionHistoryService