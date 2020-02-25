import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './home'
import Account from './components/users/account'

import Login from './components/users/login'
import Register from './components/users/register'

import NotesList from './components/notes/List'
import NotesShow from './components/notes/Show'
import NotesAdd from './components/notes/Add'
import NotesEdit from './components/notes/Edit'

import CategoriesList from './components/categories/List'
import CategoryShow from './components/categories/Show'
import CategoryEdit from './components/categories/Edit'

import {startRemoveUser} from './actions/users'
 
function App(props) {
    console.log(props)
    const handleLogout = () => {
        const token = localStorage.getItem('authToken')
        if(token) {
            const redirect = () => window.location.href = '/'
            props.dispatch(startRemoveUser(token, redirect))
            localStorage.removeItem('authToken')
        }
    }
    return (
        <div> 
            <BrowserRouter>

            <h1> Notes App </h1>

            {
                Object.keys(props.user).length != 0 ? (
                    <div> 
                        <Link to="/">Home</Link> 
                        <Link to="/notes"> Notes </Link>
                        <Link to="/categories"> Categories </Link>
                        <Link to="#" onClick={handleLogout}>Logout</Link>
                        <Link to="/account">Account</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/"> Home </Link>
                        <Link to="/login"> Login </Link> 
                    </div>
                )
            }

            <Switch>

            <Route path="/" component={Home} exact={true} />

            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/account" component={Account} exact={true} />

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