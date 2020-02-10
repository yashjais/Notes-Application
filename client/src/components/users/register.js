import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startSetUser } from '../../actions/users'
import axios from 'axios'

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
        console.log(formData)
        // this.props.dispatch(startSetUser(formData)) redux
        axios.post('http://localhost:3020/users/register',formData)
            .then(response => {
                // console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        return(
            <div>
                <h2>Register</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username"> Username </label> 
                    <input type="input" id="username" name="username" value={this.state.username} onChange={this.handleChange} /> <br />

                    <label htmlFor="email"> Email </label> 
                    <input type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} /> <br />

                    <label htmlFor="mobile"> Mobile </label> 
                    <input type="input" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /> <br />

                    <label htmlFor="password"> Password </label> 
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /> <br />

                    <input type="submit" value="Go" />
                </form>
                
            </div>
        )
    }
}

export default connect()(Register)