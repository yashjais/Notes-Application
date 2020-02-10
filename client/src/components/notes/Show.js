import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function NotesShow(props) {
    console.log('in the show of note', props)
    return (
        <div>
            <h2> Notes Show - {props.note && props.note.title} </h2>

            <h4> {props.note && props.note.description} </h4>

            <p> Category -  </p>

            <h5> Pin - {props.note && props.note.pin ? "pinned" : "not pinned"} </h5>
            
            <h5> Bin - {props.note && props.note.bin ? "in bin" : "not in bin"} </h5>

            <h5> Archive - {props.note && props.note.archive ? "archived" : "not archived"} </h5>

            <Link to={`/notes/edit/${props.note && props.note._id}`}> edit </Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.match.params.id)
        // category: state.category.find()
    }
}

export default connect(mapStateToProps)(NotesShow)