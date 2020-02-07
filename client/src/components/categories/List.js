import React from 'react'
import {connect} from 'react-redux'

function CategoriesList(props) {
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)