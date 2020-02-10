import axios from 'axios'

export const setCategories = (categories) => {
    return { type: 'SET_CATEGORIES', payload: categories}
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3020/categories',  {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const categories = response.data
                console.log(categories,'categories')
                dispatch(setCategories(categories))
            })
            .catch(err => {
                console.log(err)
            })
    }
}