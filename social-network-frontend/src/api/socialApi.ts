import axios from 'axios';
import { SocialInfluenceResponse } from '../types/types';


export const getUnconnectedPeople  = async(person: string, networks: string[]): Promise<{unconnectedCount: number}> => {
    const response = await axios.post(`/api/unconnectedPeople`, {person, networks})
    return response.data;
}

export const getSocialInfluence = async(person: string, networks:string[]):Promise<SocialInfluenceResponse> => {
    const response = await axios.post(`/api/getSocialInfluence`, {person, networks});
    return response.data
}