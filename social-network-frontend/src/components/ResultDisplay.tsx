import React from "react";
import { SocialInfluenceResponse } from "../types/types";

interface ResultDisplayProps{
    influenceData:SocialInfluenceResponse | null;
    unconnectedData: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps>=({unconnectedData, influenceData}) => {

    if(unconnectedData !==null) {
        return (
            <div>
                <h2>Unconnected people</h2>
                <p>Count of Unconnected people: {unconnectedData}</p>
            </div>
        )
    }

    if(influenceData){
        return(
            <div>
                <h2>Social Influence</h2>
                <p>First degree connections: {influenceData.firstDegreeCount}</p>
                <p>Second degree connections: {influenceData.secondDegreeCount}</p>
            </div>
        )
    }
    return null;
}

export default ResultDisplay;