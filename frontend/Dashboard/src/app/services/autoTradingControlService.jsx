import api from "@/app/libs/api.js";

const autoTradingControlService = () => {
  const healthCheck = async () => {
    const url = "http://192.168.45.3:6070/scheduler/status";
    return await api.GET(url);
  };
  const schedulerStart = async () => {
    const url = "http://192.168.45.3:6070/scheduler/start";
    return await api.POST(url,{});
  };
  const schedulerStop = async () => {
    const url = "http://192.168.45.3:6070/scheduler/stop";
    return await api.POST(url,{});
  };
  return {
    healthCheck,
    schedulerStop,
    schedulerStart
  };
};

export default autoTradingControlService;
