import { getUnconnectedPeople, getSocialInfluence } from '../src/services/socialService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Social Service', () => {

    describe('getUnconnectedPeople', () => {
        it('should return the count of unconnected people', async () => {
            mockedAxios.get.mockResolvedValue({
                data: {
                    "people": [{ "name": "John" }, { "name": "Harry" }, { "name": "Peter" }, { "name": "George" }, { "name": "Anna" }],
                    "relationships": [
                        { "type": "HasConnection", "startNode": "John", "endNode": "Peter" },
                        { "type": "HasConnection", "startNode": "John", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "Anna" }
                    ],
                }
            })
            const result = await getUnconnectedPeople(['facebook'])
            expect(result).toBe(1);
        })


        it('should return correct count when there are unconnected people', async () => {

            mockedAxios.get.mockResolvedValue({
                data: {
                    "people": [{ "name": "John" }, { "name": "Harry" }, { "name": "Peter" }, { "name": "George" }, { "name": "Anna" }],
                    "relationships": [
                        { "type": "HasConnection", "startNode": "John", "endNode": "Peter" },
                        { "type": "HasConnection", "startNode": "John", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "Anna" }
                    ],
                },
            })

            const result = await getUnconnectedPeople(['facebook'])
            expect(result).toBe(1);
        })

    })

    describe('getSocialInfluence', () => {
        it('sghuld return the correct first and second degree counts', async () => {
            mockedAxios.get.mockResolvedValue({
                data: {
                    "people": [{ "name": "John" }, { "name": "Harry" }, { "name": "Peter" }, { "name": "George" }, { "name": "Anna" }],
                    "relationships": [
                        { "type": "HasConnection", "startNode": "John", "endNode": "Peter" },
                        { "type": "HasConnection", "startNode": "John", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "George" },
                        { "type": "HasConnection", "startNode": "Peter", "endNode": "Anna" }
                    ],
                },
            });

            const result = await getSocialInfluence('John', ['facebook']);
            expect(result.firstDegreeCount).toBe(2);
            expect(result.secondDegreeCount).toBe(1)

        })
    })

})

