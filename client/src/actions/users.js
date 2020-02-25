import axios from 'axios'

export const setUser = (user) => {
    return { 
        type: 'SET_USER', payload: user
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

// Register // Setting up the user
export const startSetUser = (body, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/register', body)
            .then(response => {
                console.log(response.data, 'in the error of register')
                if(response.data.hasOwnProperty('errors')) {
                    alert(response.data._message)
                } else if(response.data.hasOwnProperty('errmsg')) {
                    alert(response.data.errmsg)
                } else {
                    console.log(response.data, 'in else')
                    redirect()
                }
            })
            .catch(err => {
                alert(err)
                // console.log(err)
            })      
    }
}

// Login // Getting the user from database
export const startGetUser = (user, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/users/login', user)
            .then(response => {
                console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    const user = response.data
                    console.log(user, 'in the thunk action')
                    const token = response.data.token
                    console.log(token)
                    localStorage.setItem('authToken', token)
                    dispatch(setUser(user))
                    redirect()
                }
            })
            .catch(err => {
                alert(err)
            })
    }
}

export const startGetUserIndex = (token) => {
    return (dispatch) => {
        axios.get('http://localhost:3020/users/account', {
            headers: {
                'x-auth': token
            }
        })
            .then(response => {
                const user = response.data
                dispatch(setUser(user))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startRemoveUser = (token, redirect) => {
    return (dispatch) => {
        axios.delete('http://localhost:3020/users/logout', {
            headers: {
                'x-auth':token
            }
        })
            .then(response => {
                console.log(response.data)
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                redirect()
            })
            .catch(err => alert(err))
    }
}