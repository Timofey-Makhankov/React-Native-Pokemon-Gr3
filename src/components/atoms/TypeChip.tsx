import ElementType from "../../Types/ElementType";
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getChipColorFromType } from "../../util/ColorFromType";
import ChipColorsType from "../../Types/ChipColorsType";

/**
 * return a pokemon Type Chip that corresponds to given Type with colors
 * @param type {@link ElementType} of a pokemon
 * @returns Type Chip component
 */
export default function TypeChip({ type }: { type: ElementType }) {
    const { container, text }: ChipColorsType = getChipColorFromType(type)
    return (
        // colors have to be defined inside the component
        <View style={[styles.container, { backgroundColor: `rgba(${container.red}, ${container.green}, ${container.blue}, 0.65)` }]}>
            <Text variant='labelLarge' style={[styles.text, { color: `rgb(${text.red}, ${text.green}, ${text.blue})` }]}>{type}</Text>
        </View>
    )
}

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