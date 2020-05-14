import React, { useState } from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import notePic from './components/image/notes.png'
import textPic from './components/image/text.jpg'

const items = [
    {
        src: notePic,
        altText: 'Notes Image',
        caption: '',
        header: '',
        key: '1'
    },
    {
        src: textPic,
        altText: 'Text',
        caption: '',
        header: '',
        key: '2'
    }
];

const Home = () => {
    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center", fontSize: "20px" }} className="text-xl-center text-uppercase font-weight-bold" >Welcome to the
        Notes Application</h2>
            <br />

            <UncontrolledCarousel items={items} />
        </div>
    )
}
export default Home