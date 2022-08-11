import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers: {
        Authorization: typeof window !== 'undefined' ? localStorage && localStorage.getItem('jwt')
        ? 'Bearer ' + localStorage.getItem('jwt')
        : null : null,
    }
})

export default axiosInstance