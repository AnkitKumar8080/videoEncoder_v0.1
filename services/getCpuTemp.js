import { exec } from "child_process";

function getCPUTemperature() {
  return new Promise((resolve, reject) => {
    exec("sensors", (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      }
      if (stderr) {
        reject(`Error: ${stderr}`);
      }

      const temperatureInfo = stdout.split("\n");
      let cpuTemperature;

      // Search for the line containing CPU temperature data
      for (let i = 0; i < temperatureInfo.length; i++) {
        if (temperatureInfo[i].includes("temp1:")) {
          cpuTemperature = temperatureInfo[i].split(": ")[1];
          break;
        }
      }
      if (cpuTemperature) {
        resolve(cpuTemperature.trim().split(" ")[0].replace(/[+°C]/g, ""));
      } else {
        reject("CPU temperature not found");
      }
    });
  });
}

export default getCPUTemperature;
