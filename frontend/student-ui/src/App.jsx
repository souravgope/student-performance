import React from "react";
import PredictionForm from "./components/PredictionForm";
// import ScoreChart from "./components/ScoreChart";

function App() {
  return (
    <div className="App">
      <div className="flex gap-4">
        <div className="flex-1">
          <PredictionForm />
        </div>
        <div className="flex-1">
          {/* <ScoreChart /> */}
        </div>
      </div>
    </div>
  );
}

export default App;

