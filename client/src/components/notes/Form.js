import React from 'react'
import {connect} from 'react-redux'

class Form extends React.Component {
    constructor(props) {
        // console.log('in the form constructor', props)
        super(props)
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            category: props.name ? props.name : "",
            categories: props.categories,
        }
        // console.log('this.state', this.state)
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

    pinChange = (e) => {
        const pin = e.target.checked
        this.setState({ pin })
    }

    binChange = (e) => {
        const bin = e.target.checked
        this.setState({ bin })
    }

    archiveChange = (e) => {
        const archive = e.target.checked
        this.setState({ archive })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            // noteImage: this.state.noteImage,
            pin: this.state.pin,
            bin: this.state.bin,
            archive: this.state.archive
        }
        this.state.category && (formData.category = this.state.category)
        this.state.description && (formData.description = this.state.description)
        if(formData.title.length < 3 || (formData.description && formData.description.length <3)){
            alert('title/description should be greater than 3 letters')
        } else {
            // console.log(formData)
            this.props.handleSubmit(formData)
        }
        

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
                    <div className="form-group col-md-6">
                        <label htmlFor="title">Title</label>
                            <input className="form-control" type="text" value={this.state.title} id="title" name="title" onChange={this.handleChange} /> <br />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="description">Description</label>
                            <textarea style={{height: '150px'}} className="form-control" type="text" value={this.state.description} id="description" name="description" onChange={this.handleChange} />  <br />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="category">Category</label>
                        <select onChange={this.handleCatChange} id="category" class="form-control">
                            <option value={this.props.category ? this.props.category._id : "select"}>
                                {this.state.category ? this.state.category : "select"}</option>
                            {
                                this.state.categories.map(category => {
                                        return <option className="form-control" key={category._id} value={category._id} >{category.name}</option>
                                }) 
                            }
                        </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('in the form mapStateToProps')
    return {
        categories: state.categories
    }
}
export default connect(mapStateToProps)(Form)