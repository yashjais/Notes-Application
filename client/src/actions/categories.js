import axios from 'axios'

export const setCategories = (categories) => {
    return { type: 'SET_CATEGORIES', payload: categories}
}

export const addCategory = (category) => {
    return { type: 'ADD_CATEGORY', payload: category}
}

export const deleteCategory = (id) => {
    return { type: 'DELETE_CATEGORY', payload: id}
}

export const editCategory = (id, category) => {
    return { type: 'EDIT_CATEGORY', payload: {id, category}}
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

export const startAddCategory = (category) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/categories', category, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const category = response.data
                console.log(category, 'category')
                dispatch(addCategory(category))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startDeleteCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3020/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const category = response.data
                dispatch(deleteCategory(category._id))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startEditcategory = (id, category, redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3020/categories/${id}`, category, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const category = response.data
                // console.log('hrere', category)
                dispatch(editCategory(id, category))
                redirect()
            })
            .catch(err => {
                console.log(err)
            })
    }
}