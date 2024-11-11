import axios from 'axios';
import {getUnconnectedPeople} from '../socialApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('API functions', () => {


    it('getUnconnectedPeople should return count of unconnected people', async() => {

        const mockResponse = { unconnectedCount: 3};
        mockedAxios.post.mockResolvedValue({data: mockResponse});

        const result = await getUnconnectedPeople('John', ['facebook'])
        expect(result).toEqual(mockResponse);
        expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/api/unconnectedPeople'), 
        {person: 'John', networks: ['facebook']})

    })



})