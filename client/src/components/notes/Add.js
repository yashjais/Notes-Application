import React from 'react'
import Form from './Form'
import {startAddNote} from '../../actions/notes'
import {connect} from 'react-redux'

function NotesAdd(props) {
    const handleSubmit = (note) => {
        console.log('clicked', note)
        props.dispatch(startAddNote(note))
        props.history.push('/notes')
        // window.location.push = '/notes'
    }
    return (
        <div>
            <h3> Add a new Note here</h3>

            <Form {...props} handleSubmit={handleSubmit}/>
        
        </div>
    )
}

export default connect()(NotesAdd)