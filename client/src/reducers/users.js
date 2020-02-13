const initialState = {}

const userReducers = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER' : {
            return {...action.payload}
        }
        case 'REMOVE_USER' : {
            return {}
        }
        default: {
            return state
        }
    }
}

export default userReducers
 