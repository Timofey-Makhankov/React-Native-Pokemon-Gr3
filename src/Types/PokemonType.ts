import ElementType from "./ElementType"

type PokemonType = {
    id: number,
    name: {
        english: String,
        japanese: String,
        chinese: String,
        french: String,
    },
    type: ElementType[],
    base: PokemonBaseType
}

export default PokemonType