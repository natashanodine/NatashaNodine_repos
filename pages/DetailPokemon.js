import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const DetailPokemon = ({ route }) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    // useEffect hook to fetch detailed data about the Pokémon when the component mounts.
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(route.params.selectedPokemon.url);
                const data = await response.json();
                setPokemonDetails(data);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            }
        }

        fetchPokemonDetails();
    }, [route.params.selectedPokemon.url]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: `rgba(${route.params.colorBackground},0.5)`, borderColor: `rgba(${route.params.colorBackground},1)` }]}>
            <View style={styles.pokemonItem}>
                <Image source={{ uri: route.params.pokemonImageUrl }} style={styles.pokemonImage} />
                <Text style={styles.headerText}># {route.params.pokemonId}</Text>
                <Text style={styles.headerText}>{route.params.selectedPokemon.name}</Text>
            </View>
            {pokemonDetails && (
                <>
                    <View style={styles.pokemonItemDetail}>
                        <Text style={styles.headerText}>Types:</Text>
                        <Text>{pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>
                    </View>
                    <View style={styles.pokemonItemDetail}>
                        <Text style={styles.headerText}>Peso:</Text>
                        <Text>{pokemonDetails.weight}</Text>
                    </View>
                    <View style={styles.pokemonItemDetail}>
                        <Text style={styles.headerText}>Sprites:</Text>
                        <View style={styles.spritesContainer}>
                            {Object.entries(pokemonDetails.sprites)
                                .filter(([key, value]) =>
                                    typeof value === 'string' && value.startsWith('http'))
                                .map(([key, spriteUrl], index) => (
                                    <Image key={index} source={{ uri: spriteUrl }} style={styles.spriteImage} />
                                ))}

                        </View>
                    </View>
                    <View style={styles.pokemonItemDetail}>
                        <Text style={styles.headerText}>Movimientos:</Text>
                        <Text>{pokemonDetails.moves.map(moveInfo => moveInfo.move.name).join(', ')}</Text>
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderWidth: 2,
    },
    pokemonItem: {
        width: '100%',
        margin: '1%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonItemDetail: {
        marginTop: 5,
        padding: 10,
    },
    pokemonImage: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    spritesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    spriteImage: {
        width: 70,
        height: 70,
    },
    headerText: {
        fontSize: 25,
    }
});

export default DetailPokemon;
