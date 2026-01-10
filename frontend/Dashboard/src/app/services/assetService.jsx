import {constants} from "@/app/libs/constants.js";
import api from "@/app/libs/api.js";

const AssetService = () => {
    const getAssetList = async () => {
        const url = '/auto/auto/assets'
        const response = await api.GET(url);
        if(response.status !== constants.RESULT_SUCCESS){
            throw new Error('');
        }
        return response
    }

    return {
        getAssetList,
    }
}

export default AssetService