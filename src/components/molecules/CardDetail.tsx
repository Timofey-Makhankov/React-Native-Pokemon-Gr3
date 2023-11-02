import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

export default function CardDetail({info}: {info: PokemonBaseType}) {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row'
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
  return (
    <View style={styles.container}>
        <View style={{width: '50%'}}>
            <Text variant='bodyLarge' style={styles.text}>Hp: </Text>
            <Text variant='bodyLarge' style={styles.text}>Attack: </Text>
            <Text variant='bodyLarge' style={styles.text}>Defense: </Text>
            <Text variant='bodyLarge' style={styles.text}>Sp. Attack:</Text>
            <Text variant='bodyLarge' style={styles.text}>Sp. Defense:</Text>
            <Text variant='bodyLarge' style={styles.text}>Speed:</Text>
        </View>
        <View style={{ width: '50%'}}>
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
