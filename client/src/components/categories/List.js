import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function CategoriesList(props) {
    const handleSubmit = (cat) => {
        console.log('clicked', cat)
        // props.dispatch(startAddCategory(cat))
        // props.history.push('/categories')
    }
    console.log('in listing of categories', props)
    return (
        <div>
            <h1> Listing of Categories - {props.categories && props.categories.length} </h1>
            <ul>
                {
                    props.categories.map(category => {
                        return (
                            <li key={category._id}> {category.name} </li>
                        )
                    })
                }
            </ul>
            <Form {...props} handleSubmit={handleSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)