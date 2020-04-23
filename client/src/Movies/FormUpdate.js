import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const FormUpdate = props => {
    const [newMovie, setNewMovie] = useState({
        id: Date.now(),
        title: "",
        director: "",
        metascore: 0,
        stars: []
    })

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
            console.log(response.data);

            setNewMovie(response.data)
            // console.log("This is props.newMovie", props.newMovie);
        })
        .catch(error => {
            console.log(error)
        })
    }, [id])

    const updateMovie = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, newMovie)
        .then(response => {
            console.log(response.data)

            props.setMovieList([
                ...props.movieList.map(X => {
                    if(X.id == newMovie.id) {
                        X = newMovie;
                        console.log("THIS IS X", X);
                        return X
                    } else {
                        return X;
                    }
                })
            ]);
            console.log("This is props.movieList", props.movieList);
            push(`/movies/${id}`)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleChanges = e => {
        e.preventDefault();

        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleChangesArray = (e, i)  => {
        e.preventDefault();

        setNewMovie({
            ...newMovie,
            ...newMovie.stars, [e.target.name]: [e.target.value]
        })
    }

    // const handleClick = e => {
    //     e.preventDefault();

    //     setNewMovie({
    //         ...newMovie,
    //         stars: newMovie.stars[0].split(", ")      
    //     })

    //     // console.log(newMovie.stars);
    // }

    return (
        <div>
            <h1 className={"formDiv"}>Update Movie Info</h1>

            <div className={"formDiv"}>
                <form onSubmit={updateMovie}>
                    <label>
                        <input 
                            type="text"
                            placeholder="Type updated title"
                            name="title"
                            value={newMovie.title}
                            onChange={handleChanges}
                        />
                    </label><br/><br/>
                    <label>
                        <input 
                            type="text"
                            placeholder="Type updated director"
                            name="director"
                            value={newMovie.director}
                            onChange={handleChanges}
                        />
                    </label><br/><br/>
                    <label>
                        <input 
                            type="text"
                            placeholder="Type updated metascore"
                            name="metascore"
                            value={newMovie.metascore}
                            onChange={handleChanges}
                        />
                    </label><br/><br/>
                    <label>
                        <input 
                            type="text"
                            placeholder="Type updated stars"
                            name="stars"
                            value={newMovie.stars}
                            onChange={handleChangesArray}
                        />
                    </label><br/><br/>
                    <button>Update Movie</button>
                </form>
            </div>
        </div>
    )
}

export default FormUpdate
