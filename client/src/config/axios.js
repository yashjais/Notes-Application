import Axios from 'axios'

const axios = Axios.create({
    // baseURL: 'http://localhost:3020' // for dev
    baseURL: '' // for production
})

export default axios