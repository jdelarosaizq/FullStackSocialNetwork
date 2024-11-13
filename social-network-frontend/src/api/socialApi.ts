import axios from 'axios';
import { SocialInfluenceResponse } from '../types/types';

const  API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getUnconnectedPeople  = async(person: string, networks: string[]): Promise<{unconnectedCount: number}> => {    
    const response = await axios.post(`${API_BASE_URL}/api/unconnectedPeople`, {person, networks})
    return response.data;
}

export const getSocialInfluence = async(person: string, networks:string[]):Promise<SocialInfluenceResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/getSocialInfluence`, {person, networks});
    return response.data
}