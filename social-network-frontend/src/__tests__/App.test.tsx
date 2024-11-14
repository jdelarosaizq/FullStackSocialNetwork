import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { useSocial } from '../hooks/useSocial';

// Mock useSocial hook
jest.mock('../hooks/useSocial');

const mockedUseSocialInfluence = useSocial as jest.MockedFunction<typeof useSocial>;

describe('App Component', () => {
  beforeEach(() => {
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: null,
      error: null,
      loading: false,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: jest.fn(),
    });
  });

  it('renders the main components', () => {
    render(<App />);
    
    expect(screen.getByText('Check social influence data')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter person name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter networks name')).toBeInTheDocument();
  });

  it('displays loading message when loading is true', () => {
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: null,
      error: null,
      loading: true,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error is set', () => {
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: null,
      error: 'Failed to fetch data',
      loading: false,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('displays results when data is set', () => {
    const mockData = { firstDegreeCount: 3, secondDegreeCount: 2 };
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: mockData,
      unconnectedData: null,
      error: null,
      loading: false,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Social Influence')).toBeInTheDocument();
    expect(screen.getByText('First degree connections: 3')).toBeInTheDocument();
    expect(screen.getByText('Second degree connections: 2')).toBeInTheDocument();
  });

  it('displays unconnected people count when unconnectedData is set', () => {
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: 7,
      error: null,
      loading: false,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Unconnected people')).toBeInTheDocument();
    expect(screen.getByText('Count of Unconnected people: 7')).toBeInTheDocument();
  });

  it('calls fetchSocialInfluence when SocialForm submits social influence data', () => {
    const mockFetchSocialInfluence = jest.fn();
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: null,
      error: null,
      loading: false,
      fetchSocialInfluence: mockFetchSocialInfluence,
      fetchUnconnectedPeople: jest.fn(),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter person name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter networks name'), { target: { value: ['facebook'] } });
    fireEvent.click(screen.getByText('Check social influence'));

    expect(mockFetchSocialInfluence).toHaveBeenCalledWith('John', ['facebook']);
  });

  it('calls fetchUnconnectedPeople when SocialForm submits unconnected people data', () => {
    const mockFetchUnconnectedPeople = jest.fn();
    mockedUseSocialInfluence.mockReturnValue({
      influenceData: null,
      unconnectedData: null,
      error: null,
      loading: false,
      fetchSocialInfluence: jest.fn(),
      fetchUnconnectedPeople: mockFetchUnconnectedPeople,
    });

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter person name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter networks name'), { target: { value: ['facebook'] } });
    fireEvent.click(screen.getByText('Check unconnected people'));

    expect(mockFetchUnconnectedPeople).toHaveBeenCalledWith('John', ['facebook']);
  });
});
