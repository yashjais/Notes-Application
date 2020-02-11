import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startAddCategory} from '../../actions/categories'
import {startDeleteCategory} from '../../actions/categories'

function CategoriesList(props) {
    const handleSubmit = (cat) => {
        console.log('clicked', cat)
        props.dispatch(startAddCategory(cat))
    }
    const handleDelete = (id) => {
        console.log(id)
        props.dispatch(startDeleteCategory(id))
    }
    console.log('in listing of categories', props) 
    return (
        <div>
            <h2> Listing of Categories - {props.categories && props.categories.length} </h2>
            <ul>
                {
                    props.categories.map(category => {
                        return (
                            <li key={category._id}> {category.name} <Link to={`categories/${category._id}`}>show</Link>  <button onClick={() => {
                                handleDelete(category._id)
                            }}>delete</button> </li>
                        )
                    })
                }
            </ul>
            <Form action='Add' handleSubmit={handleSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)