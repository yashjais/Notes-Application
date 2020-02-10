import React from 'react'
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import Login from './components/users/login'
import Register from './components/users/register'

import NotesList from './components/notes/List'
import NotesShow from './components/notes/Show'
import NotesAdd from './components/notes/Add'
import NotesEdit from './components/notes/Edit'

import CategoriesList from './components/categories/List'
 
function App(props) {
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/account/login' // reload the page too
        // props.history.push('/account/login') // don't work here coz we don't have access to BrowserRouter of react-router-dom
    }
    return (
        <div> 
            <BrowserRouter>

            <h1> Notes App </h1>

            {
                localStorage.getItem('authToken') ? (
                    <div> 
                        <Link to="/notes"> Notes </Link>
                        <Link to="/categories"> Categories </Link>
                        <Link to="#" onClick={handleLogout}>Logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/"> Home </Link>
                        <Link to="/login"> Login </Link> 
                    </div>
                )
            }

            <Switch>

            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />

            <Route path="/notes" component={NotesList} exact={true} />
            <Route path="/notes/add" component={NotesAdd} exact={true} />
            <Route path="/notes/edit/:id" component={NotesEdit} exact={true} />
            <Route path="/notes/:id" component={NotesShow} />

            <Route path="/categories" component={CategoriesList} />
            </Switch>

            </BrowserRouter>
        </div>
    )
}

export default App