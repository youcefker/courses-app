import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "/api/v1",
    headers: {
        Authorization: typeof window !== 'undefined' ? localStorage && localStorage.getItem('jwt')
        ? 'Bearer ' + localStorage.getItem('jwt')
        : null : null,
    }
})

export default axiosInstance