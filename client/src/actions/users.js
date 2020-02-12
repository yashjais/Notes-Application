import axios from 'axios'

export const setUser = (token) => {
    return { type: 'SET_USER', payload: token}
}

export const startGetUser = (body, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/register', body)
            .then(response => {
                // console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    redirect()
                }
            })
            .catch(err => {
                alert(err)
            })
    }
}

export const startSetUser = (user, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/login', user)
            .then(response => {
                console.log(response.data, 'inthe error of login')
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.error)
                }else{
                    const token = response.data.token
                    console.log(response.data)
                    localStorage.setItem('authToken', token)
                    dispatch(setUser(response.data))
                    redirect()
                }
            })
            .catch(err => {
                // console.log(err)
                alert('invalid password/email')
            })      
    }
}