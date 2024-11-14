import React from "react";
import SocialForm from "./components/SocialForm";
import ResultDisplay from "./components/ResultDisplay";
import { useSocial } from "./hooks/useSocial";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/App.css";


const App: React.FC = () => {

  const {
    unconnectedData,
    influenceData,
    error,
    loading,
    fetchSocialInfluence,
    fetchUnconnectedPeople
  } = useSocial();

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Check social influence data</h1>

      <div className="row mb-4">
        <div className="col-12">
          <SocialForm onUnconnectedPeopleSubmit={fetchUnconnectedPeople} onSocialInfluenceSubmit={fetchSocialInfluence} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <ResultDisplay unconnectedData={unconnectedData} influenceData={influenceData} />
        </div>
      </div>

    </div>
  )

}

export default App;