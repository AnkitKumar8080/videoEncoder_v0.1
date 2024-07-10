import { exec } from "child_process";

const getCpuUsage = () => {
  return new Promise((resolve, reject) => {
    exec('top -b -n 1 | grep "%Cpu(s)"', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject("Error: ", error);
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        reject("Error: ", stderr);
      }

      const cpuInfo = stdout.trim().split(/\s+/);
      const idleCpu = parseFloat(cpuInfo[7]);
      const usedCpu = 100 - idleCpu;

      // console.log(`CPU Usage: ${usedCpu.toFixed(2)}%`);
      resolve(usedCpu.toFixed(2));
    });
  });
};

export default getCpuUsage;
