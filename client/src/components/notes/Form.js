import React from 'react'
import {connect} from 'react-redux'

class Form extends React.Component {
    constructor(props) {
        console.log('in the form constructor', props)
        super(props)
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            // category: props.category ? props.category._id : "",
            // // noteImage: props.noteImage ? props.noteImage : "",
            // categoryName: props.category ? props.category.name : "select",
            // categories: props && props.categories
            // title: "",
            // description: "",
            category: props.category ? props.category._id : "select",
            categories: props.categories
        }
        console.log('this.state', this.state)
    }

    // handleFileChange = (e) => {
        // console.log(e.target.files)
        // const noteImage = e.target.files[0]
        // console.log(noteImage)
        // this.setState({ noteImage })
    // }

    handleChange = (e) => {
        // console.log(e.target.value, 'clicked')
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCatChange = (e) => {
        const category = e.target.value
        this.setState({category})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            // noteImage: this.state.noteImage
        }
        console.log('this.props', this.props)

        console.log(formData)
        this.props.handleSubmit(formData)
        

        // const formData = new FormData()
        // formData.append('title', this.state.title)
        // formData.append('description', this.state.description)
        // formData.append('category', this.state.category)
        // formData.append('noteImage', this.state.noteImage)
        // console.dir(formData)
        // this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                        <input type="text" value={this.state.title} id="title" name="title" onChange={this.handleChange} /> <br />

                    <label htmlFor="description">Description</label>
                        <input type="text" value={this.state.description} id="description" name="description" onChange={this.handleChange} /> <br />
                    
                    <label>Category</label>
                    <select onChange={this.handleCatChange}>
                        <option value="">{this.props.category ? this.props.category.name : "select"}</option>
                        {
                           this.state.categories.map(category => {
                                return <option key={category._id} value={category._id} >{category.name}</option>
                           }) 
                        }
                    </select> <br />
                    {/* <input type="file" name="noteImage" onChange={this.handleFileChange} /> <br /> */}
                    <input type="submit" value="go!" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('in the form mapStateToProps')
    return {
        categories: state.categories
    }
}
export default connect(mapStateToProps)(Form)