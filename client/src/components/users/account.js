import React from 'react'
import {connect} from 'react-redux'

function Account(props) {
    return (
        <div>
            <h2> User Info </h2>
            <h3>username - {props.user && props.user.username}</h3>
            <h3>email - {props.user && props.user.email}</h3>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)