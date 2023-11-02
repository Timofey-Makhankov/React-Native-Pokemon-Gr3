import ElementType from "../../Types/ElementType";
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getChipColorFromType, getContainerColorFromType } from "../../util/ColorFromType";
import AlphaColor from "../../Types/AlphaColor";
import ChipColorsType from "../../Types/ChipColorsType";


const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        borderRadius: 12
    },
    text: {
        paddingHorizontal: 16,
        paddingVertical: 8
    }
})

export default function TypeChip({ type }: { type: ElementType }) {
    const { container, text }: ChipColorsType = getChipColorFromType(type)
    return (
        <View style={[styles.container, { backgroundColor: `rgba(${container.red}, ${container.green}, ${container.blue}, 0.65)` }]}>
            <Text variant='labelLarge' style={[styles.text, { color: `rgb(${text.red}, ${text.green}, ${text.blue})` }]}>{type}</Text>
        </View>
    )
}