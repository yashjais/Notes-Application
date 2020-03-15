import axios from '../config/axios'

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

export const deleteNote = (id) => {
    return {
        type: "DELETE_NOTE", payload: id
    }
}

export const startGetNotes = () => {
    return (dispatch) => {
        axios.get('/notes', {
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
                if(err.response) { // net::ERR_CONNECTION_REFUSED // err.response is undefined
                    if(err.response.status == 401) {
                        alert(err.response.status)
                        // console.log(window.location)
                        // console.log(window.history)
                        // if(window.location.pathname == '/login' ||  window.location.pathname == '/register') {
                        //     console.log('happy hacking')
                        // } else {
                        //     window.alert('You have to login First')
                        //     window.location.href = '/login'
                        // }
                    }
                } else {
                    alert('window will be reloaded')
                    window.location.reload()
                }
            })
    }
    
}

export const startAddNote = (note, redirect) => {
    return (dispatch) => {
        axios.post('/notes', note, {
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
        axios.put(`/notes/${id}`, note, {
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

export const startDeleteNote = (id) => {
    return (dispatch) => {
        axios.delete(`/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                dispatch(deleteNote(id))
            }) 
    }
}

export const startBinNote = (id, note) => {
    return (dispatch) => {
        axios.put(`/notes/${id}`, note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                dispatch(editNote(id, note))
            }) 
    }
}

export const startPinNote = (id, note) => {
    return (dispatch) => {
        axios.put(`/notes/${id}`, note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                dispatch(editNote(id, note))
            }) 
    }
}

export const startArchiveNote = (id, note) => {
    return (dispatch) => {
        axios.put(`/notes/${id}`, note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                dispatch(editNote(id, note))
            }) 
    }
}