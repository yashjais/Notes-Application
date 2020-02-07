import React from 'react'
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import NotesList from './components/notes/List'
import NotesShow from './components/notes/Show'
import NotesAdd from './components/notes/Add'
import NotesEdit from './components/notes/Edit'

import CategoriesList from './components/categories/List'
 
function App(props) {
    return (
        <div> 
            <BrowserRouter>

            <h1> Notes App </h1>

            <Link to="/"> Home </Link>
            <Link to="/notes"> Notes </Link>
            <Link to="/categories"> Categories </Link>

            <Switch>
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