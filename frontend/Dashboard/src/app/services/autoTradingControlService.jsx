import api from "@/app/libs/api.js";

const autoTradingControlService = () => {
  const healthCheck = async () => {
    const url = "http://192.168.45.3:6070/health";
    return await api.GET(url);
  };
  const runningCheck = async () => {
    const url = "http://192.168.45.3:6070/running";
    return await api.GET(url);
  };
  return {
    healthCheck,
    runningCheck,
  };
};

export default autoTradingControlService;
