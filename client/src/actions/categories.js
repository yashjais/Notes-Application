import axios from '../config/axios'

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
        axios.get('/categories',  {
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
                if(err.response) { // net::ERR_CONNECTION_REFUSED // err.response is undefined
                    if(err.response.status == 401) {
                        console.log(err.response.status)
                        // console.log(err.response.status)
                        // console.log(window.location)
                        // if(window.location.href != '/login'){
                        //     window.alert('You have to login First')
                        //     window.location.href = '/login'
                        // }  
                    }
                } else {
                    window.location.reload()
                }
            })
    }
}

export const startAddCategory = (category) => {
    return (dispatch) => {
        axios.post('/categories', category, {
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
        axios.delete(`/categories/${id}`, {
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
        axios.put(`/categories/${id}`, category, {
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