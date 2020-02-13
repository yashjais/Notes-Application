import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store/configureStore'
import {startGetUserByToken} from './actions/users'
import {startGetNotes} from './actions/notes'
import {startSetCategories} from './actions/categories'

const store = configureStore()
store.subscribe(() => {
    console.log('in the index', store.getState())
})

// console.log(store.getState())
if(localStorage.getItem('authToken')){
    const token = localStorage.getItem('authToken')
    store.dispatch(startGetUserByToken(token))
    store.dispatch(startGetNotes())
    store.dispatch(startSetCategories())
} else if(window.location.pathname != '/login') {
    window.location.href = '/login'
}


const ele = (
    <Provider store={store}> 
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'))