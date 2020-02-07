import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {startEditNote} from '../../actions/notes'

function NotesEdit(props) {
    const handleSubmit = (note) => {
        console.log('clicked', note)
        props.dispatch(startEditNote(props.note._id , note))
        props.history.push('/notes')
        // window.location.push = '/notes'
    }
    console.log('in the edit', props)
    return (
        <div>
            <h1> Edit </h1>

            <Form {...props.note} handleSubmit={handleSubmit}/>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(NotesEdit)