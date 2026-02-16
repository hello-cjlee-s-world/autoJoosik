import api from "@/app/libs/api.js";

const autoTradingControlService = () => {
  const healthCheck = async () => {
    const url = "https://cjlee.kr/autoApi/scheduler/status";
    return await api.GET(url);
  };
  const schedulerStart = async () => {
    const url = "https://cjlee.kr/autoApi/scheduler/start";
    return await api.POST(url,{});
  };
  const schedulerStop = async () => {
    const url = "https://cjlee.kr/autoApi/scheduler/stop";
    return await api.POST(url,{});
  };
  return {
    healthCheck,
    schedulerStop,
    schedulerStart
  };
};

export default autoTradingControlService;
