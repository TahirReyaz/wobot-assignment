import React from "react";

import WobotLogo from "./assets/WobotLogo.png";

import CameraTable from "./components/CameraTable";

function App() {
  return (
    <main className="p-4">
      <div className="flex justify-end">
        <img src={WobotLogo}></img>
      </div>
      <CameraTable />
    </main>
  );
}

export default App;
