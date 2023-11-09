/**
 * All given vairants, that a pokemon can be
 */
export const TYPE = {
    FIRE: "Fire",
    GRASS: "Grass",
    WATER: "Water",
    BUG: "Bug",
    DARK: "Dark",
    DRAGON: "Dragon",
    ELECTRIC: "Electric",
    FAIRY: "Fairy",
    FIGHTING: "Fighting",
    FLYING: "Flying",
    GHOST: "Ghost",
    GROUND: "Ground",
    ICE: "Ice",
    NORMAL: "Normal",
    POISON: "Poison",
    PSYCHIC: "Psychic",
    ROCK: "Rock",
    STEEL: "Steel"
} as const

type ObjectValues<T> = T[keyof T]

/**
 * Make all pokemon types be a Type
 */
type ElementType = ObjectValues<typeof TYPE>

export default ElementType