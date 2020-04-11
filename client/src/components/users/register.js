import React from 'react'
import { connect } from 'react-redux'
import { startSetUser } from '../../actions/users'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            mobile: '',
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
            username: this.state.username,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        }
        // console.log(formData)
        const redirect = () => this.props.history.push('/login')
        this.props.dispatch(startSetUser(formData, redirect)) 
    }
    render() {
        return(
            <div>
                <br />
                <h2 className = "text-xl-center">Register</h2>
                <br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control"  type="input" id="username" name="username" value={this.state.username} onChange={this.handleChange} /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input className="form-control"  type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />  
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input className="form-control"  type="input" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} />   
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control"  type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /> 
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        )
    }
}

export default connect()(Register)