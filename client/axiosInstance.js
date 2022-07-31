import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('jwt')
        ? 'Bearer ' + localStorage.getItem('jwt')
        : null,
    }
})

export default axiosInstance