import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store/configureStore'
import {startGetNotes} from './actions/notes'
import {startSetCategories} from './actions/categories'

const store = configureStore()
store.subscribe(() => {
    console.log('in the index', store.getState())
})
// console.log(store.getState())
store.dispatch(startGetNotes())
store.dispatch(startSetCategories())

const ele = (
    <Provider store={store}> 
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'))