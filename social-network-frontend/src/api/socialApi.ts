import axios from 'axios';


export const getUnconnectedPeople  = async(person: string, networks: string[]): Promise<{unconnectedCount: number}> => {
    const response = await axios.post(`/api/unconnectedPeople`, {person, networks})
    return response.data;
}