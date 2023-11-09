import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native'
import { BottomNavigation, FAB, Searchbar } from 'react-native-paper'
import PokemonCard from '../organisms/PokemonCard'
import PokemonType from '../../Types/PokemonType'
import PokemonService from '../../services/PokemonService'
import { useNavigation } from '@react-navigation/native'
import { CREATE_PAGE } from '../../ScreenRouterLinks'

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

/**
 * Pokedex Page with all the pokemons in a list
 * @returns Pokedex Page component
 */
export default function PokedexPage() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query: string) => {
        setSearchQuery(query)
        const newlist = pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(query.toLowerCase()))
        setFilteredList(newlist)
    };
    const [pokemonList, setPokemonList] = useState<PokemonType[]>([])
    const [filterdList, setFilteredList] = useState<PokemonType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    
    useEffect(() => {
        updateList
    }, [])

    const updateList = () => {
        setRefreshing(true)
        PokemonService().getAll()
      .then((value) => {
        console.log(value)
        setPokemonList(value.data)
        setFilteredList(value.data)
    })
      .catch((error) => console.log(error))
      .finally(() => { setRefreshing(false) })
    }
    

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
                        data={filterdList}
                        refreshing={refreshing}
                        onRefresh={ () => updateList() }
                        renderItem={item => <PokemonCard pokemonData={item.item} />}
                        keyExtractor={(item) => `${item.id}`}
                        ItemSeparatorComponent={() => (<View style={{ height: 16 }} />)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <FAB
                    icon='plus'
                    style={[styles.fab]}
                    onPress={() => { navigation.navigate(CREATE_PAGE, {pokemonId: undefined, buttonText: "Create"}) }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}