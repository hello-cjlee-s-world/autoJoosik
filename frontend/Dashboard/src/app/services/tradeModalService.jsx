import api from "@/app/libs/api.js";
import {constants} from "@/app/libs/constants.js";

const TradeModalService = () => {
  const stockBuy = async (stkCd, qty) => {
    const url = "https://cjlee.kr/autoApi/market/buy"
    const params = {stkCd, qty}
    const response = await api.POST(url, params);
    if (response.status !== constants.RESULT_SUCCESS) {
      throw new Error(response.error);
    }
    return response
  };
  const stockSell = async (stkCd, qty) => {
    const url = "https://cjlee.kr/autoApi/market/sell"
    const params = {stkCd, qty}
    const response = await api.POST(url,params);
    if (response.status !== constants.RESULT_SUCCESS) {
      throw new Error(response.error);
    }
    return response
  };

  return {
    stockBuy,
    stockSell,
  };
};

export default TradeModalService