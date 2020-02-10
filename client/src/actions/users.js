import axios from 'axios'

export const startSetUser = (user) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/register', user)
            .then(response => {
                const user = response.data
                console.log(user)
                // dispatch(getNotes(user))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startGetUser = (user) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/login', user)
            .then(response => {
                const token = response.data
                localStorage.setItem('authToken', token)
                this.props.history.push('/')
                console.log(token)
            })
    }
}