import React from 'react';
import {screen, render} from '@testing-library/react';
import SocialForm from '../SocialForm';

describe('SocialForm Component', () => {


    it ('has input fields and buttons', () =>{
        render(<SocialForm/>)
        expect(screen.getByPlaceholderText('Enter person name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter network name')).toBeInTheDocument();
        expect(screen.getByText('Check unconnected people')).toBeInTheDocument();

    })

    
})