import React from 'react'
import {connect} from 'react-redux'
import {startForgotUser} from '../../actions/users'

class ForgotPassword extends React.Component {
    constructor() {
        super()
        this.state = {
            email: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const email = this.state.email
        console.log(email)
        const redirect = () => this.props.history.push('/login')
        this.props.dispatch(startForgotUser(email, redirect))
    }
    render() {
        return (
            <div> 
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Send us Your Email address</label>
                        <input className="form-control" aria-describedby="emailHelp" type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">Make sure you have an valid Email Address</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(ForgotPassword)