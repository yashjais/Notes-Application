import React from 'react'
import Form from './Form'
import {startAddNote} from '../../actions/notes'
import {connect} from 'react-redux'

function NotesAdd(props) {
    const handleSubmit = (note) => {
        console.log('clicked', note)
        const redirect = () => props.history.push('/notes')
        props.dispatch(startAddNote(note, redirect)) // this is an asynchronus tasks
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