import axios from 'axios'

export const getNotes = (notes) => {
    return {
        type: "SET_NOTES", payload: notes
    }
}

export const addNote = (note) => {
    return {
        type: "ADD_NOTE", payload: note
    }
}

export const editNote = (id, note) => {
    return {
        type: "EDIT_NOTE", payload: {id, note}
    }
}

export const startGetNotes = () => {
    return (dispatch) => {
        axios.get('http://localhost:3020/notes', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const notes = response.data
                dispatch(getNotes(notes))
            })
            .catch(err => {
                console.log(err)
            })
    }
    
}

export const startAddNote = (note, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3020/notes', note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const note = response.data
                dispatch(addNote(note))
                redirect()
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startEditNote = (id, note, redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3020/notes/${id}`, note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const note = response.data
                // console.log('hrere', note)
                dispatch(editNote(id, note))
                redirect()
            })
            .catch(err => {
                console.log(err)
            })
    }
}