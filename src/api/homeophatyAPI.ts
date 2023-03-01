import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const baseURL = 'http://192.168.0.4:3001/api'

const homeophatyAPI = axios.create({
    baseURL
})

homeophatyAPI.interceptors.request.use(
    async( config ) => {
        const token = await AsyncStorage.getItem('token')

        if( token ){
            config.headers['x-token'] = token
        }

        return config
    }
)

export default homeophatyAPI
