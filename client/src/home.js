import React from 'react'
import NotePic from './components/image/notes.png'

function Home(props) {
    return (
        <div style={{ textAlign: "center", fontSize: "20px" }} className="text-xl-center text-uppercase font-weight-bold" >
            <br />
            <br />
            Welcome to the Notes App <br />
            <br />
            <img src={NotePic} style={{ width: "100%" }} />

        </div>
    )
}

export default Home