import Axios from 'axios'

const axios = Axios.create({
    // baseURL: 'http://localhost:3020' // for dev
    baseURL: 'https://yash-notes.herokuapp.com' // for production
})

export default axios