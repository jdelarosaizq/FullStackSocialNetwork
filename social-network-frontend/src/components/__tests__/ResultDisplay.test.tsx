import React from "react";
import {render , screen} from '@testing-library/react'
import ResultDisplay from '../ResultDisplay'
import { SocialInfluenceResponse } from "../../types/types";


describe('ResultDisplay component', ()=>{

    it('displays nothing if no data is provided', ()=>{
        const {container} = render(<ResultDisplay influenceData={null} unconnectedData={null}/>)
        expect(container.firstChild).toBeNull();
    })

    it('displayes unconnected people', () => {
        render(<ResultDisplay influenceData={null} unconnectedData={2}/>)
        expect(screen.getByText('Unconnected people')).toBeInTheDocument();
        expect(screen.getByText('Count of Unconnected people: 2')).toBeInTheDocument();

    })

    it('displayes social influence data when provided', () => {
        const socialInfluenceData:SocialInfluenceResponse = {firstDegreeCount:4, secondDegreeCount: 2}
        render(<ResultDisplay influenceData={socialInfluenceData} unconnectedData={null}/>)

        expect(screen.getByText('Social Influence')).toBeInTheDocument();
        expect(screen.getByText('First degree connections: 4')).toBeInTheDocument()
        expect(screen.getByText('Second degree connections: 2')).toBeInTheDocument();
    })

})