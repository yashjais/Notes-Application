import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetUser } from '../../actions/users'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        const redirect = () => window.location.href = '/'
        // const redirect = () => this.props.history.location.reload
        this.props.dispatch(startGetUser(formData, redirect))
    }
    render() {
        return(
            <div>
                <h2>Login</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email"> Email </label> 
                    <input type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} /> <br />

                    <label htmlFor="password"> Password </label> 
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /> <br />

                    <input type="submit" value="Go" />
                </form>
                <Link to="/register" > Register </Link>
            </div>
        )
    }
}

export default connect()(Login)