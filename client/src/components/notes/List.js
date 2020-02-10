import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function NotesList(props) {
    console.log('in listing of notes',props)
    return (
        <div>
            <h1> Listing of Notes - {props.notes && props.notes.length} </h1>
            <ul>
                {
                    props.notes.map(note => {
                        return (
                            <li key={note._id}> {note.title}  - {note.description} - {note.category ? note.category.name : "uncategorized"} - {note.pin ? "pinned" : "not pinned"} - {note.bin ? "bin" : "not in bin"} - {note.archive ? "archived" : "not archived"}  <Link to={`/notes/${note._id}`}> show </Link></li>
                        )
                    })
                }
            </ul>
            <Link to="/notes/add"> add </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}
  
export default connect(mapStateToProps)(NotesList)