import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ListPokemons = ({ navigation }) => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const POKEMONS_PER_PAGE = 10;

  // useEffect to fetch Pokemon data when the page number changes.
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const offset = (page - 1) * POKEMONS_PER_PAGE;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMONS_PER_PAGE}&offset=${offset}`);
        const data = await response.json();

        if (data.results.length === 0) {
          setAllLoaded(true);
        } else {
          setPokemonsData(prevData => [...prevData, ...data.results]);
        }
      } catch (error) {
        console.error("There was an error fetching the pokemons", error);
      }
    };

    fetchPokemons();
  }, [page]);

  // Function to extract the Pokemon ID from the URL
  const getPokemonId = (url) => {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 2];
  }

  // Filtering Pokemon based on the search term.
  const filteredPokemons = pokemonsData.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Function to generate a random RGB color value for the background of each item.
  const getRandomRGBA = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `${red},${green},${blue}`;
  }

  // Function to render each Pokemon item in the FlatList.
  const renderPokemonItem = ({ item: pokemon }) => {
    const pokemonId = getPokemonId(pokemon.url);
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const colorBackground = getRandomRGBA();

    return (
      <TouchableOpacity
        style={[styles.pokemonItem, { backgroundColor: `rgba(${colorBackground},0.5)`, borderColor: `rgba(${colorBackground},1)` }]}
        onPress={() => navigation.navigate('DetailPokemon', {
          selectedPokemon: pokemon,
          pokemonId: pokemonId,
          pokemonImageUrl: pokemonImageUrl,
          colorBackground: colorBackground
        })}
      >
        <Image source={{ uri: pokemonImageUrl }} style={{ width: 90, height: 90 }} />
        <Text style={styles.headerText}># {pokemonId}</Text>
        <Text style={styles.headerText}>{pokemon.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Pokémon"
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={filteredPokemons}
        renderItem={renderPokemonItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={() => {
          if (!allLoaded) setPage(prevPage => prevPage + 1);
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  pokemonItem: {
    width: '48%',
    marginBottom: 4,
    marginHorizontal: '1%', 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  headerText: {
    fontSize: 20,
  },
  loadMoreButton: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  loadMoreText: {
    fontSize: 18,
    color: 'white',
  }
});

export default ListPokemons;
