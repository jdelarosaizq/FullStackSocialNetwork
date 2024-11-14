import { renderHook, act, waitFor } from "@testing-library/react";
import { useSocial } from "../useSocial";
import { getSocialInfluence, getUnconnectedPeople } from "../../api/socialApi";

jest.mock('../../api/socialApi');
const mockedGetUnconnectedPeople = getUnconnectedPeople as jest.MockedFunction<typeof getUnconnectedPeople>
const mockedGetSocialInfluence = getSocialInfluence as jest.MockedFunction<typeof getSocialInfluence>

describe('useSocial', () => {

    it('retrieves and set unconnected data', async()=>{
        const mockUnconnectedCount = {unconnectedCount:2};
        mockedGetUnconnectedPeople.mockResolvedValue(mockUnconnectedCount);

        const{result} = renderHook(() => useSocial())

        act(() => {
            result.current.fetchUnconnectedPeople('John', ['facebook']);
        });

        await waitFor(() => {
            expect(result.current.unconnectedData).toBe(2);
            expect(result.current.error).toBe(null)
            expect(result.current.loading).toBe(false)
    
        })        
    })

    it('retrieves and set social influence data', async() => {

        const mockInfluenceData = {firstDegreeCount: 2, secondDegreeCount: 1}
        mockedGetSocialInfluence.mockResolvedValue(mockInfluenceData);

        const{result} = renderHook(()=> useSocial())
        
        act(() => {
            result.current.fetchSocialInfluence('John', ['facebook']);
        })

        await waitFor(() => {
            expect(result.current.influenceData).toEqual(mockInfluenceData);
            expect(result.current.error).toBe(null);
            expect(result.current.loading).toBe(false);
    
        });
    })


    it('SHow error if Social influence fetch fails', async()=>{
        mockedGetSocialInfluence.mockRejectedValue(new Error ('Failed to fetch'));

        const{result} = renderHook(() => useSocial())

        act(() => {
            result.current.fetchSocialInfluence('John', ['facebook'])
        })

        await waitFor(() => {
            expect(result.current.influenceData).toBe(null);
            expect(result.current.error).toBe('Failed to fetch');
            expect(result.current.loading).toBe(false)
    
        });
    })

})