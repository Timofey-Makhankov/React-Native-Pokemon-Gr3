import React from 'react'
import { Text } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

/**
 * The Card Details of pokemon stats for the pokemon card
 * @param info with the pokemon base data
 * @returns Card Details function for the pokemon card
 * @see {@link PokemonBaseType}
 */
export default function CardDetail({info}: {info: PokemonBaseType}) {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text variant='bodyLarge' style={styles.text}>Hp: </Text>
            <Text variant='bodyLarge' style={styles.text}>Attack: </Text>
            <Text variant='bodyLarge' style={styles.text}>Defense: </Text>
            <Text variant='bodyLarge' style={styles.text}>Sp. Attack:</Text>
            <Text variant='bodyLarge' style={styles.text}>Sp. Defense:</Text>
            <Text variant='bodyLarge' style={styles.text}>Speed:</Text>
        </View>
        <View style={styles.textContainer}>
            <Text variant='bodyLarge' style={styles.textValue}>{info.HP}</Text>
            <Text variant='bodyLarge' style={styles.textValue}>{info.Attack}</Text>
            <Text variant='bodyLarge' style={styles.textValue}>{info.Defense}</Text>
            <Text variant='bodyLarge' style={styles.textValue}>{info['Sp. Attack']}</Text>
            <Text variant='bodyLarge' style={styles.textValue}>{info['Sp. Defense']}</Text>
            <Text variant='bodyLarge' style={styles.textValue}>{info.Speed}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    textContainer: {
        width: '50%'
    },
    text: {
        paddingVertical: 2,
        color: '#49454F'
    },
    textValue: {
        paddingVertical: 2,
        textAlign: 'right',
        color: '#49454F'
    }
})
