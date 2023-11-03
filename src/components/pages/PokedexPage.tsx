import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native'
import { BottomNavigation, FAB, Searchbar } from 'react-native-paper'
import PokemonCard from '../organisms/PokemonCard'
import PokemonType from '../../Types/PokemonType'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

const exampleDate: PokemonType[] = [{
    id: 4,
    name: {
        english: 'Charmander',
        japanese: '',
        chinese: '',
        french: ''
    },
    type: ['Fire'],
    base: {
        HP: 45,
        Attack: 45,
        Defense: 45,
        "Sp. Attack": 45,
        "Sp. Defense": 45,
        Speed: 45
    }
},
{
    id: 5,
    name: {
        english: 'Charmeleon',
        japanese: '',
        chinese: '',
        french: ''
    },
    type: ['Fire'],
    base: {
        HP: 45,
        Attack: 45,
        Defense: 45,
        "Sp. Attack": 45,
        "Sp. Defense": 45,
        Speed: 45
    }
},
{
    id: 6,
    name: {
        english: 'Charizard',
        japanese: '',
        chinese: '',
        french: ''
    },
    type: ['Fire'],
    base: {
        HP: 45,
        Attack: 45,
        Defense: 45,
        "Sp. Attack": 45,
        "Sp. Defense": 45,
        Speed: 45
    }
},
{
    id: 7,
    name: {
        english: 'Squirtle',
        japanese: '',
        chinese: '',
        french: ''
    },
    type: ['Water'],
    base: {
        HP: 45,
        Attack: 45,
        Defense: 45,
        "Sp. Attack": 45,
        "Sp. Defense": 45,
        Speed: 45
    }
}
]

export default function PokedexPage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    
    return (
        <ImageBackground source={require('../../../assets/wp10311654.png')} style={{ width: '100%', height: '100%' }} blurRadius={8}>
            <SafeAreaView style={[styles.screen]}>
                <Image style={{ width: '100%', height: '15%', marginTop: 32 }} source={require('../../../assets/International_Pokémon_logo.svg.png')} resizeMode='contain' />
                <Searchbar
                style = {{ marginTop: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <View style={{ paddingTop: 16, height: '72%' }}>
                    <FlatList
                        data={exampleDate}
                        renderItem={item => <PokemonCard pokemonData={item.item} />}
                        keyExtractor={(item) => `${item.id}`}
                        ItemSeparatorComponent={() => (<View style={{ height: 16 }} />)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <FAB
                    icon='plus'
                    style={[styles.fab]}
                    onPress={() => { }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}

