const initialState = []

const categoriesReducers = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CATEGORIES" : {
            return [...state, ...action.payload]
        }
        case "ADD_CATEGORY" : {
            return [...state, action.payload] 
        }
        case "DELETE_CATEGORY" : {
            return state.filter(cat => cat._id !== action.payload)
        }
        case "EDIT_CATEGORY" : {
            return state.map(cat => {
                if(cat._id == action.payload.id) {
                    return {...cat, ...action.payload.category}
                } else {
                    return {...cat}
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default categoriesReducers