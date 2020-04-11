import React from 'react'
import {connect} from 'react-redux'

class CategoriesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name ? props.name : ''
        }
        // console.log(props, 'hrere')
    }
    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.name.length > 2) {
            const formData = {
                name: this.state.name
            }
            this.props.handleSubmit(formData)
            this.setState({ name: ''})
        } else {
            window.alert('Category name should be of minimum 3 letters')
        }
    }
    render() {
        return(
            <div>
                <h3> {this.props.action} a Category here </h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"> name </label>
                    <input type="input" id="name" name="name" value={this.state.name} onChange={this.handleChange} /> 
                    <input type="submit" value="Go!" />
                </form>
            </div>
        )
    }
}

export default connect()(CategoriesForm)