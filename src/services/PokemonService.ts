import { AxiosInstance, AxiosResponse } from "axios"
import PokemonType from "../Types/PokemonType"
import { defaultAxiosInstance } from "./Api"

const PokemonService = (api: AxiosInstance = defaultAxiosInstance) => ({
    getAll: async () : Promise<AxiosResponse<PokemonType[]>> => {
        const data = await api.get("/pokemons")
        return data
    },

    getById: async (id: number) : Promise<AxiosResponse<PokemonType>> => {
        const data = await api.get(`/pokemons/${id}`)
        return data
    },

    create: async (pokemon: PokemonType) : Promise<AxiosResponse<PokemonType>> => {
        const data  = await api.post("/pokemons", pokemon)
        return data
    },
    update: async (id: number, pokemon: PokemonType) : Promise<AxiosResponse<PokemonType>> => {
        const data = await api.put(`/pokemons(${id})`, pokemon)
        return data
    },
    delete: async (id: number) : Promise<AxiosResponse<any>> => {
        const data = await api.delete(`/pokemons/${id}`)
        return data
    }
})

export default PokemonService