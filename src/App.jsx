import { useState, useEffect } from "react";
import "./App.css";
import QRCode from "react-qr-code";

function App() {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    // Request IP address from main process
    window.ipcRenderer.send("get-ip");

    // Receive IP address from main process and update state
    window.ipcRenderer.on("ip-address", (data) => {
      setIpAddress(data);
    });

    // Cleanup event listener
  }, []);
  return (
    <>
      <div>
        <h1>Your IP Address:</h1>
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode value={ipAddress} />
        </div>
      </div>
      {/* Your other JSX content goes here */}
    </>
  );
}

export default App;
