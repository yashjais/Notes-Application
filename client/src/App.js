import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

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

import { startRemoveUser } from './actions/users'

function App(props) {
    // console.log(props)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const redirect = () => window.location.href = '/'
            props.dispatch(startRemoveUser(token, redirect))
            localStorage.removeItem('authToken')
        }
    }
    return (
        <div className="container">
            <BrowserRouter>

                <Navbar color="light" light expand="md">
                    <NavbarBrand style={{ fontWeight: "bold", textTransform: "uppercase" }}>Notes App</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {
                                Object.keys(props.user).length != 0 ? (
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} to="/">Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/notes">Notes</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/categories">Categories</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#" onClick={handleLogout}>Logout</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/account">Account</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            <NavItem>
                                                <NavLink tag={Link} to="/">Home</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to="/login">Login</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to="/register">Register</NavLink>
                                            </NavItem>
                                        </React.Fragment>
                                    )
                            }
                        </Nav>
                    </Collapse>
                </Navbar>

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