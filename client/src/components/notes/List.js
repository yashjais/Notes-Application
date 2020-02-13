import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startDeleteNote,startPinNote,startBinNote,startArchiveNote} from '../../actions/notes'

function NotesList(props) {
    console.log('in listing of notes',props.location.pathname)
    const name = (props.location && props.location.pathname.split('/')[(props.location.pathname.split('/')).length - 1] )
    console.log(name, 'here')
    console.log('in the listing', props.categories)
    const handleClick = (id) => {
        props.dispatch(startDeleteNote(id))
    }
    const handlePinClick = (id) => {
        const note = props.notes.find(note => note._id == id)
        note.pin = !note.pin
        props.dispatch(startPinNote(id, note))
    }
    const handleBinClick = (id) => {
        const note = props.notes.find(note => note._id == id)
        note.bin = !note.bin
        props.dispatch(startBinNote(id, note))
    }
    const handleArchiveClick = (id) => {
        const note = props.notes.find(note => note._id == id)
        note.archive = !note.archive
        props.dispatch(startArchiveNote(id, note))
    }
    return (
        <div>
            <Link to="/notes">All</Link> || <Link to="/notes/pin">Pinned</Link> || <Link to="/notes/bin">Binned</Link> || <Link to="/notes/archive">Archived</Link>
            <h2> Listing of Notes - {props.notes && props.notes.length} </h2>
            <ul>
                {
                    props.notes.map(note => {
                        return ( 
                            <li key={note._id}> 
                            {note.title} - 
                            {note.description} - 
                            {(props.categories && (props.categories.find(cat => cat._id == (note.category && note.category)))) && (props.categories && (props.categories.find(cat => cat._id == (note.category && note.category)))).name }  
                            <Link to={`/notes/${note._id}`}> show </Link>
                            <button onClick={()=>{
                                handlePinClick(note._id)
                            }} >{note.pin ? "unpin" : "pin"}</button>
                            <button onClick={()=>{
                                handleBinClick(note._id)
                            }} >{note.bin ? "unbin" : "bin"}</button>
                            <button onClick={()=>{
                                handleArchiveClick(note._id)
                            }} >{note.archive ? "unarchive" : "archive"}</button>
                            <button onClick={()=>{
                                handleClick(note._id)
                            }}>delete</button></li>
                        )
                    })
                }
            </ul>
            <Link to="/notes/add"> add </Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        // condition ? statement : condition ? statement : condition ? statement : statement
        notes:  (props.location && props.location.pathname.split('/')[(props.location.pathname.split('/')).length - 1] == 'notes') ? (state.notes.sort((a, b) => b.pin - a.pin).filter(note => note.archive == false)) :  (props.location && props.location.pathname.split('/')[(props.location.pathname.split('/')).length - 1] == 'pin') ? (state.notes.filter(note => note.pin == true)) : (props.location && props.location.pathname.split('/')[(props.location.pathname.split('/')).length - 1] == 'bin') ? (state.notes.filter(note => note.bin == true)) : (state.notes.filter(note => note.archive == true)),
        categories: state.categories
    }
}
  
export default connect(mapStateToProps)(NotesList)