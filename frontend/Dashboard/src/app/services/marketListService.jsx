import {constants} from "@/app/libs/constants.js";
import api from "@/app/libs/api.js";

const MarketListService = () => {
    const getStockInfoList = async () => {
        const url = '/auto/auto/stocks'
        const response = await api.GET(url);
        if(response.status !== constants.RESULT_SUCCESS){
            throw new Error('');
        }
        return response
    }

    return {
      getStockInfoList,
    }
}

export default MarketListService