import React from 'react'
import { connect } from 'react-redux'

function Account(props) {
    return (
        <div>
            <br />
            <h2> User Info </h2>
            <br />
            <h3>Username - {props.user && props.user.username}</h3>
            <br />
            <h3>Email - {props.user && props.user.email}</h3>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)