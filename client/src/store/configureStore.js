import {createStore, combineReducers, applyMiddleware} from 'redux'
import notesReducers from '../reducers/notes'
import categoriesReducers from '../reducers/categories'
import usersReducers from '../reducers/users'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        notes: notesReducers,
        categories: categoriesReducers,
        users: usersReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore