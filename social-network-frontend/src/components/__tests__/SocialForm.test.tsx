import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import SocialForm from '../SocialForm';

describe('SocialForm Component', () => {


    it ('has input fields and buttons', () =>{
        render(<SocialForm onUnconnectedPeopleSubmit ={jest.fn()}/>);
        expect(screen.getByPlaceholderText('Enter person name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter networks name')).toBeInTheDocument();
        expect(screen.getByText('Check unconnected people')).toBeInTheDocument();

    })

    it ('call onUnconnectedPeopleSubmit with corret values', () => {

        const onUnconnectedPeopleSubmit = jest.fn();
        render(<SocialForm onUnconnectedPeopleSubmit={onUnconnectedPeopleSubmit}/>)

        fireEvent.change(screen.getByPlaceholderText('Enter person name'), {target: {value: 'John'}})
        fireEvent.change(screen.getByPlaceholderText('Enter networks name'), {target:{value: 'facebook'}})
        fireEvent.click(screen.getByText('Check unconnected people'))

        expect(onUnconnectedPeopleSubmit).toHaveBeenCalledWith('John', ['facebook']);
    })
})