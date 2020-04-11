import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import configureStore from './store/configureStore'
import {startGetUserIndex} from './actions/users'
import {startGetNotes} from './actions/notes'
import {startSetCategories} from './actions/categories'

const store = configureStore()
// store.subscribe(() => {
//     console.log('in the index', store.getState())
// })

// console.log(store.getState())
if(localStorage.getItem('authToken')){
    const token = localStorage.getItem('authToken')
    store.dispatch(startGetUserIndex(token))
    store.dispatch(startGetNotes())
    store.dispatch(startSetCategories())
} 


const ele = (
    <Provider store={store}> 
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'))