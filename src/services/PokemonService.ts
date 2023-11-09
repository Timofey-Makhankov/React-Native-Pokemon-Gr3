import { AxiosInstance, AxiosResponse } from "axios"
import PokemonType from "../Types/PokemonType"
import { defaultAxiosInstance } from "./Api"

/**
 * The Authorization for manipulating pokemon data
 * @param api of an axios instance. gives defaultAxiosInstance when no api is provided
 * @returns a list of function used by the service
 */
const PokemonService = (api: AxiosInstance = defaultAxiosInstance) => ({

    /**
     * Get all Pokemons
     * @returns a list of pokemons
     * @see {@link PokemonType}
     */
    getAll: async () : Promise<AxiosResponse<PokemonType[]>> => {
        const data = await api.get("/pokemons")
        return data
    },

    /**
     * get a pokemon by its pokedex number (id)
     * @param id of a pokemon
     * @returns a Pokemon
     * @see {@link PokemonType}
     */
    getById: async (id: number) : Promise<AxiosResponse<PokemonType>> => {
        const data = await api.get(`/pokemons/${id}`)
        return data
    },

    /**
     * Create a new pokemon with provided pokemon object
     * @param pokemon to be saved
     * @returns the newly created pokemon that has been given
     * @see {@link PokemonType}
     */
    create: async (pokemon: PokemonType) : Promise<AxiosResponse<PokemonType>> => {
        const data  = await api.post("/pokemons/", pokemon)
        return data
    },

    /**
     * Update a given pokemon by id and update the values that are provided
     * @param id of a pokemon
     * @param pokemon object to be updated to
     * @returns the updated pokemon
     * @see {@link PokemonType}
     */
    update: async (id: number, pokemon: PokemonType) : Promise<AxiosResponse<PokemonType>> => {
        const data = await api.put(`/pokemons(${id})`, pokemon)
        return data
    },

    /**
     * delete a pokemon by its id
     * @param id of a pokemon
     * @returns the deleted pokemon
     * @see {@link PokemonType}
     */
    delete: async (id: number) : Promise<AxiosResponse<any>> => {
        const data = await api.delete(`/pokemons/${id}`)
        return data
    }
})

export default PokemonService