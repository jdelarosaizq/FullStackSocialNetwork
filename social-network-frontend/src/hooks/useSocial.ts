import { useState } from "react";
import { getSocialInfluence, getUnconnectedPeople } from "../api/socialApi";
import { SocialInfluenceResponse } from "../types/types";

export const useSocial = () => {
    const[unconnectedData, setUnconnectedData] = useState<number | null > (null)
    const[influenceData, setInfluenceData] = useState<SocialInfluenceResponse | null > (null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchUnconnectedPeople = async(person: string, networks: string[]) => {

        setLoading(true);
        setError(null);
        try{
            const response = await getUnconnectedPeople(person, networks);
            setUnconnectedData(response.unconnectedCount);
            setInfluenceData(null);
        } catch (err){
            setError((err as Error).message);
            setUnconnectedData(null);

        }finally{
            setLoading(false)
        }

    }


    const fetchSocialInfluence = async(person:string, networks: string[]) => {
        setLoading(true);
        setError(null);
        try{
            const response = await getSocialInfluence(person, networks);
            setInfluenceData(response);
            setUnconnectedData(null);

        } catch (err) {
            setError((err as Error).message)
            setInfluenceData(null);

        }finally{
            setLoading(false)
        }
    }

    return {unconnectedData, influenceData, error, loading, fetchUnconnectedPeople, fetchSocialInfluence}

}