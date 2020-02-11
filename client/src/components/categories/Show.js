import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function CategoryShow(props) {
    console.log(props.match.params.id, props)
    return(
        <div>
            <h2> Category - {props.category && props.category.name} </h2>
            <Link to={`/categories/edit/${props.category && props.category._id}`}>edit</Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(cat => cat._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(CategoryShow)