import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function CategoryShow(props) {
    // console.log(props.match.params.id, props)
    return(
        <div>
            <h2> Category - {props.category && props.category.name} </h2>
            <h3> Notes belonging to this category :  </h3>
            <ul>
                {
                    props.notes.map(note => {
                        return (
                            <li key={note._id}>{note.title} - {note.description}<Link to={`/notes/${note._id}`}>show</Link></li>
                        )
                    })
                }
            </ul>
            <Link to={`/categories/edit/${props.category && props.category._id}`}>edit</Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(cat => cat._id == props.match.params.id),
        notess: state.notes,
        notes: state.notes.filter(no => no.category == ((state.categories.find(cat => cat._id == props.match.params.id)) && (state.categories.find(cat => cat._id == props.match.params.id)._id)) )
    }
}

export default connect(mapStateToProps)(CategoryShow)