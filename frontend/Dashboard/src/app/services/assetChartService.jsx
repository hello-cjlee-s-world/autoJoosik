import {constants} from "@/app/libs/constants.js";
import api from "@/app/libs/api.js";

const assetChartService = () => {
    const getAssetDailyList = async () => {
        const url = '/auto/auto/assetDailies'
        const response = await api.GET(url);
        if(response.status !== constants.RESULT_SUCCESS){
            throw new Error('');
        }
        return response
    }


    return {
      getAssetDailyList,
    }
}

export default assetChartService