import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import Lottie from "lottie-react";
import Error404 from "../assets/404.json";
import Search from "../assets/search.json";

function Home() {
    //all states
    const [title, setTitle] = useState('');
    const [released, setReleased] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [poster, setPoster] = useState('');
    const [text, setText] = useState('');
    const [error404, setError404] = useState(false);
    const [searchVisible, setSearchVisible] = useState(true);
    //onChange
    function handleChange(event) {
        setText(event.target.value);
    }
    //req api omdb
    async function search() {
        await axios.get(`https://www.omdbapi.com/?t=${text}&apikey=bb2d4971`)
            .then((response) => {
                setSearchVisible(false)
                if (response.data.Title == undefined) {
                    setError404(true)
                    setTitle('')
                    setReleased('')
                    setGenre('')
                    setDirector('')
                    setPoster('')
                } else {
                    setError404(false)
                    setTitle(response.data.Title);
                    setReleased(response.data.Released);
                    setGenre(response.data.Genre);
                    setDirector(response.data.Director);
                    setPoster(response.data.Poster);
                }

            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
    return (
        <div className="main">
            <div className='card'>
                {(searchVisible == true) &&
                    < Lottie animationData={Search} className='error404' />
                }
                {(error404 == true) &&
                    < Lottie animationData={Error404} className='error404' />
                }
                {(poster != '') &&
                    <div><img src={poster} className='poster' alt="Logo" /></div>
                }
                {(title != '') &&
                    <div><h2 className='title'>{title}</h2></div>
                }
                {(released != '') &&
                    <div><h3 className='released'>{released}</h3></div>
                }
                {(genre != '') &&
                    <div><h3 className='genre'>{genre}</h3></div>
                }
                {(director != '') &&
                    <div><h3 className='director'>{director}</h3></div>
                }
            </div>
            <label className='form-control'>
                <input type='text' name='search' className='inputSearch' placeholder='Procurando algum filme?' onChange={handleChange} />
            </label>
            <div>
                <button className='button' onClick={() => search()}>
                    Buscar
                </button>
            </div>
        </div>
    )
}
export default Home