import { exec } from "child_process";

function getRAMUsage() {
  return new Promise((resolve, reject) => {
    exec("free -m", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        reject(stderr);
      }

      const ramInfo = stdout.trim().split("\n");
      const memory = ramInfo[1].split(/\s+/);

      const totalMemory = parseFloat(memory[1]);
      const usedMemory = parseFloat(memory[2]);
      const freeMemory = parseFloat(memory[3]);
      const ramUsage = (usedMemory / totalMemory) * 100;

      // console.log(`RAM Usage: ${ramUsage.toFixed(2)}%`);
      resolve(ramUsage.toFixed(2));
    });
  });
}

export default getRAMUsage;
