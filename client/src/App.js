import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './home'
import Account from './components/users/account'

import Login from './components/users/login'
import Register from './components/users/register'
import ForgotPassword from './components/users/forgotPassword'

import NotesList from './components/notes/List'
import NotesShow from './components/notes/Show'
import NotesAdd from './components/notes/Add'
import NotesEdit from './components/notes/Edit'

import CategoriesList from './components/categories/List'
import CategoryShow from './components/categories/Show'
import CategoryEdit from './components/categories/Edit'

import {startRemoveUser} from './actions/users'
 
function App(props) {
    // console.log(props)
    const handleLogout = () => {
        const token = localStorage.getItem('authToken')
        if(token) {
            const redirect = () => window.location.href = '/'
            props.dispatch(startRemoveUser(token, redirect))
            localStorage.removeItem('authToken')
        }
    }
    return (
        <div className="container"> 
            <BrowserRouter>
 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Notes App</span>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            Object.keys(props.user).length != 0 ? (
                                <React.Fragment> 
                                    
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/notes"> Notes </Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/categories"> Categories </Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link float-right" to="#" onClick={handleLogout}> Logout </Link>
                                    </li>
                                    <li className="nav-item active">
                                       <Link className="nav-link float-right" to="/account"> Account </Link>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/"> Home </Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/login"> Login </Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/register"> Register </Link> 
                                    </li>
                                </React.Fragment>
                            )
                        }            
                    </ul>
                </div>
            </nav>

            <Switch>

            <Route path="/" component={Home} exact={true} />

            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/account" component={Account} exact={true} />
            <Route path="/forgot-password" component={ForgotPassword} exact={true} />

            <Route path="/notes" component={NotesList} exact={true} />
            <Route path="/notes/pin" component={NotesList} exact={true} />
            <Route path="/notes/bin" component={NotesList} exact={true} />
            <Route path="/notes/archive" component={NotesList} exact={true} />
            <Route path="/notes/add" component={NotesAdd} exact={true} />
            <Route path="/notes/edit/:id" component={NotesEdit} exact={true} />
            <Route path="/notes/:id" component={NotesShow} />

            <Route path="/categories" component={CategoriesList} exact={true} />
            <Route path="/categories/edit/:id" component={CategoryEdit} exact={true} />
            <Route path="/categories/:id" component={CategoryShow} />
            </Switch>

            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App)