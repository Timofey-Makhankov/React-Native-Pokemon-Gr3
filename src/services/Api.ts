import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"

const BASE_URL = "http://noseryoung.ddns.net:3030"

const jwtKey = "access_token"

export const defaultAxiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL
})

defaultAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        let correctPath: boolean =
            config.url !== "/login" && config.url !== "/register"
        if (localStorage.getItem(jwtKey) !== "" && correctPath) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(jwtKey)}`
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)