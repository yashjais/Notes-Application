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
            <br />
            <h2 className="text-xl-center text-uppercase font-weight-bold"> Notes - {props.notes && props.notes.length} </h2>
            <br />
            <Link to="/notes">All</Link> || <Link to="/notes/pin">Pinned</Link> || <Link to="/notes/bin">Binned</Link> || <Link to="/notes/archive">Archived</Link> <br />
            <Link to="/notes/add"> Add a Note here </Link>
            <br />
            <br />
            <div className="row row-cols-1 row-cols-md-3" style={{backgroundColor: '#f7f7f7'}}>
            {
                props.notes.map(note => {
                    return(
                                <div className="col mb-4" key={note._id}>
                                    <div className="card-body" style={{height: '220px',margin: '15px', backgroundColor: '#e8e8e8'}}>
                                        <h5 className="card-title">{note.title}</h5>
                                        <p className="card-text">{note.description}</p>
                                        <Link to="/notes" onClick={()=>{
                                            handlePinClick(note._id)
                                        }} >{note.pin ? "unpin" : "pin"}</Link> ||| 
                                        <Link to="/notes" onClick={()=>{
                                            handleBinClick(note._id)
                                        }} >{note.bin ? "unbin" : "bin"}</Link> ||| 
                                        <Link to="/notes" onClick={()=>{
                                            handleArchiveClick(note._id)
                                        }} >{note.archive ? "unarchive" : "archive"}</Link> ||| 
                                        <Link to="/notes" onClick={()=>{
                                            handleClick(note._id)
                                        }}>delete</Link>
                                    </div>
                                </div>
                    )
                })
            }
            </div>     
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