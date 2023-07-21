import React from 'react';
import { render, act } from '@testing-library/react-native';
import DetailPokemon from './DetailPokemon';

describe('DetailPokemon', () => {
  const mockResponse = {
    types: [{ type: { name: 'water' } }],
    weight: 65,
    sprites: {
      front_default: 'http://example.com/front_default.png',
      back_default: 'http://example.com/back_default.png',
    },
    moves: [{ move: { name: 'surf' } }, { move: { name: 'tackle' } }],
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders passed pokemon details from route props', async () => {
    const route = {
      params: {
        selectedPokemon: {
          url: 'http://example.com/api/pokemon/1',
          name: 'bulbasaur',
        },
        pokemonImageUrl: 'http://example.com/pokemon-image.png',
        pokemonId: 1,
        colorBackground: '255,255,255',
      },
    };

    const { findByText } = render(<DetailPokemon route={route} />);
    const nameElement = await findByText('bulbasaur');
    const idElement = await findByText('# 1');

    expect(nameElement).toBeTruthy();
    expect(idElement).toBeTruthy();
  });

  it('renders fetched pokemon details after API call', async () => {
    const route = {
      params: {
        selectedPokemon: {
          url: 'http://example.com/api/pokemon/1',
          name: 'bulbasaur',
        },
        pokemonImageUrl: 'http://example.com/pokemon-image.png',
        pokemonId: 1,
        colorBackground: '255,255,255',
      },
    };

    const { findByText } = render(<DetailPokemon route={route} />);
    
    const typeElement = await findByText('Types:');
    const typeValue = await findByText('water');
    const weightElement = await findByText('Peso:');
    const weightValue = await findByText('65');
    const movesElement = await findByText('Movimientos:');
    const movesValue = await findByText('surf, tackle');

    expect(typeElement).toBeTruthy();
    expect(typeValue).toBeTruthy();
    expect(weightElement).toBeTruthy();
    expect(weightValue).toBeTruthy();
    expect(movesElement).toBeTruthy();
    expect(movesValue).toBeTruthy();
  });
});
