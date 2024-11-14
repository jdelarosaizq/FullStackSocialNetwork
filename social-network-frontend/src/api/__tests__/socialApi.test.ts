import axios from 'axios';
import { getUnconnectedPeople, getSocialInfluence } from '../socialApi';
import { SocialInfluenceResponse } from '../../types/types';
import { networkInterfaces } from 'os';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('API functions', () => {


    it('getUnconnectedPeople should return count of unconnected people', async () => {

        const mockResponse = { unconnectedCount: 3 };
        mockedAxios.post.mockResolvedValue({ data: mockResponse });

        const result = await getUnconnectedPeople('John', ['facebook'])
        expect(result).toEqual(mockResponse);
        expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/api/unconnectedPeople'),
            { person: 'John', networks: ['facebook'] })

    })


    it('getSocialInfluence should return social influence data', async () => {

        const mockResponse: SocialInfluenceResponse = { firstDegreeCount: 2, secondDegreeCount: 1 };
        mockedAxios.post.mockResolvedValue({ data: mockResponse })

        const result = await getSocialInfluence('John', ['facebook', 'twitter']);
        expect(result).toEqual(mockResponse)
        expect(mockedAxios.post).toHaveBeenLastCalledWith(expect.stringContaining('/api/getSocialInfluence'),
            {
                person: 'John',
                networks: ['facebook', 'twitter'],
            })
    })


})