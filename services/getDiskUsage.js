import { exec } from "child_process";

function getDiskUsage() {
  return new Promise((resolve, reject) => {
    exec("df -h", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        reject(stderr);
      }

      const diskInfo = stdout.trim().split("\n");
      // if the disk space doesn't show choose your disk part from here diskInfo[1], diskInfo[2] (execute command df -h and detect your disk part )
      const rootDisk = diskInfo[2].split(/\s+/);
      const totalDiskSpace = rootDisk[1];
      const usedDiskSpace = rootDisk[2];
      const availableDiskSpace = rootDisk[3];
      const diskUsage = rootDisk[4];

      // console.log(
      // `Disk Usage - Total: ${totalDiskSpace}, Used: ${usedDiskSpace}, Available: ${availableDiskSpace}, Usage: ${diskUsage}`
      // );
      const perc = (
        (usedDiskSpace.split("G")[0] / totalDiskSpace.split("G")[0]) *
        100
      ).toFixed(2);
      resolve(perc);
    });
  });
}

export default getDiskUsage;
