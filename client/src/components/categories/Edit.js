import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {startEditcategory} from '../../actions/categories'

function CategoryEdit(props) {
    console.log(props.match.params.id)
    const handleSubmit = (category) => {
        console.log('clicked', category)
        const redirect = () => props.history.push('/categories')
        props.dispatch(startEditcategory(props.category._id , category, redirect))
    }
    return (
        <div>
            <Form {...props.category} action="Edit" handleSubmit={handleSubmit}/>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(cat => cat._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(CategoryEdit)