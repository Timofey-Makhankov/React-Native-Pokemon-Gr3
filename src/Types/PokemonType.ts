import ElementType from "./ElementType"

/**
 * Object representation of a Pokemon
 */
type PokemonType = {
    id?: number,
    name: {
        english: string,
        japanese: string,
        chinese: string,
        french: string,
    },
    type: ElementType[],
    base: PokemonBaseType
}

export default PokemonType