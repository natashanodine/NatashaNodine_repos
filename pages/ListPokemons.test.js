import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListPokemons from './ListPokemons';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      results: [
        {
          name: "charmander",
          url: "https://pokeapi.co/api/v2/pokemon/25/"
        }
      ]
    })
  })
);

describe('ListPokemons', () => {

  beforeEach(() => {
    fetch.mockClear();
  });
  // test the component renders witout crashing
  it('renders without crashing', () => {
    render(<ListPokemons />);
  });

  // test the input changes
  it('search input updates on change', () => {
    const { getByPlaceholderText } = render(<ListPokemons />);
    const searchInput = getByPlaceholderText('Buscar Pokémon');
    fireEvent.changeText(searchInput, 'char');
    expect(searchInput.props.value).toBe('char');
  });

  // test the pokemon list is displayed
  it('displays the Pokémon list correctly', async () => {
    const { findByText } = render(<ListPokemons />);
    const pikachuText = await findByText('charmander');
    expect(pikachuText).toBeDefined();
  });

});

