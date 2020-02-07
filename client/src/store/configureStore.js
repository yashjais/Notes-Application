import {createStore, combineReducers, applyMiddleware} from 'redux'
import notesReducers from '../reducers/notes'
import categoriesReducers from '../reducers/categories'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        notes: notesReducers,
        categories: categoriesReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore