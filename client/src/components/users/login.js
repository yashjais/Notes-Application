import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetUser } from '../../actions/users'
import axios from 'axios'

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
        // this.props.dispatch(startGetUser(formData))
        // localStorage.setItem('authToken', token)
        // this.props.history.push('/')
        axios.post('http://localhost:3020/users/login',formData)
        .then(response => {
            console.log(response.data)
            if(response.data.hasOwnProperty('error')){
                alert(response.data.error)
            }else{
                const token = response.data.token
                localStorage.setItem('authToken', token)
                this.props.history.push('/')
                window.location.reload()
            }
        })
        .catch(err => {
            alert(err)
        })
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