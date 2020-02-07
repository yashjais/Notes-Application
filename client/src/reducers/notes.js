const initialState = []

const notesReducers = (state = initialState, action) => {
    switch(action.type) {
        case "SET_NOTES" : {
            return [...state, ...action.payload]
        }
        case "ADD_NOTE" : {
            return [...state, action.payload]
        }
        case "EDIT_NOTE" : {
            return state.map(note => {
                if(note._id == action.payload.id) {
                    return {...note, ...action.payload.note}
                } else {
                    return {...note}
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default notesReducers