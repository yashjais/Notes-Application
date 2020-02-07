import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function NotesShow(props) {
    console.log('in the show of note', props)
    return (
        <div>
            <h2> Notes Show - {props.note && props.note.title} </h2>

            <h4> {props.note && props.note.description} </h4>

            <p> Category - {(props.note && props.note.category) ? props.note.category.name : "uncategorized"} </p>

            <Link to={`/notes/edit/${props.note && props.note._id}`}> edit </Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(NotesShow)