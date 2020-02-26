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
        const redirect = () => this.props.history.push('/')
        // const redirect = () => this.props.history.location.reload
        this.props.dispatch(startGetUser(formData, redirect)) // startGetUser
    }
    render() {
        return(
            <div >
                <br />

                <h2 className = "text-xl-center">Login</h2>
                
                <br />

                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input className="form-control" aria-describedby="emailHelp" type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Link to="/forgot-password" > Forgot Password</Link> 
                <br />
                <Link to="/register" > Register </Link>
            </div>
        )
    }
}

export default connect()(Login)