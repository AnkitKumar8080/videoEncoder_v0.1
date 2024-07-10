import getCPUTemperature from "../services/getCpuTemp.js";
import getCpuUsage from "../services/getCpuUsage.js";
import getDiskUsage from "../services/getDiskUsage.js";
import getRAMUsage from "../services/getRamUsage.js";

const getResourceUsage = async (req, res) => {
  try {
    const usageObj = {
      cpuUsage: await getCpuUsage(),
      ramUsage: await getRAMUsage(),
      diskUsage: await getDiskUsage(),
      temperature: await getCPUTemperature(),
    };
    console.log(usageObj);
    return res.status(200).json(usageObj);
  } catch (error) {
    console.log(error);
    return res.status(500).json("server error");
  }
};

export { getResourceUsage };
