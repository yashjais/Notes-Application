import axios from 'axios'

export const setCategories = (categories) => {
    return { type: 'SET_CATEGORIES', payload: categories}
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3020/categories')
            .then(response => {
                const categories = response.data
                dispatch(setCategories(categories))
            })
            .catch(err => {
                console.log(err)
            })
    }
}