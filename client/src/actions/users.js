import axios from '../config/axios'

import Swal from 'sweetalert2'

import {startGetNotes} from '../actions/notes'
import {startSetCategories} from '../actions/categories'

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
        axios.post('/users/register', body)
            .then(response => {
                // console.log(response.data, 'in the error of register')
                if(response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                      })
                } else if(response.data.hasOwnProperty('errmsg')) {
                    // console.log(response.data.errmsg)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Enter another credentials',
                      })
                } else {
                    // console.log(response.data, 'in else')
                    Swal.fire(
                    'Good job!',
                    'Successfully created account',
                    'success'
                    )
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
        axios.post('/users/login', user)
            .then(response => {
                // console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    // console.log(response.data.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                      })
                }else{
                    const user = response.data
                    // console.log(user, 'in the thunk action')
                    const token = response.data.token
                    // console.log(token)
                    localStorage.setItem('authToken', token)
                    Swal.fire(
                        'Good job!',
                        'Successfully logged in',
                        'success'
                    )
                    dispatch(setUser(user))
                    dispatch(startGetNotes())
                    dispatch(startSetCategories())
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
        axios.get('/users/account', {
            headers: {
                'x-auth': token
            }
        })
            .then(response => {
                const user = response.data
                dispatch(setUser(user))
            })
            .catch(err => {
                // console.log(err)
            })
    }
}

export const startRemoveUser = (token, redirect) => {
    return (dispatch) => {
        axios.delete('/users/logout', {
            headers: {
                'x-auth':token
            }
        })
            .then(response => {
                // console.log(response.data)
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                redirect()
            })
            .catch(err => alert(err))
    }
}

export const startForgotUser = (email, redirect) => {
    return dispatch => {
        axios.post('/users/forgot-password', {email})
            .then(response => {
                // if invalid user - // user does not found
                Swal.fire({
                    icon: 'success',
                    title: 'User Found',
                    text: 'The link has been sent to Registered User Id',
                  })
                  redirect()
            })
            .catch(err => {
                // console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User not Found',
                  })
            })
    }
}