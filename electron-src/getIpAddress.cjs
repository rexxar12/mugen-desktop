const os = require("os");

function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = "";

  for (const key in networkInterfaces) {
    const networkInterface = networkInterfaces[key];
    const ipv4Address = networkInterface.find((item) => item.family === "IPv4");

    if (ipv4Address && !ipv4Address.internal) {
      ipAddress = ipv4Address.address;
      break;
    }
  }
  console.log(ipAddress);
  return ipAddress;
}

module.exports = getLocalIpAddress;