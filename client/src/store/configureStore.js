import {createStore, combineReducers, applyMiddleware} from 'redux'
import notesReducers from '../reducers/notes'
import categoriesReducers from '../reducers/categories'
import userReducers from '../reducers/users'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        notes: notesReducers,
        categories: categoriesReducers,
        user: userReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore